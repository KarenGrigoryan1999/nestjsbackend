import { Role } from './../roles/roles.model';
import { ExternalAuth } from './../external-auth/external-auth.model';
import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.model";
import { MailerService } from "@nestjs-modules/mailer";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { ResetPasswordDto } from "src/users/dto/reset-password.dto";
import { VerifyResetPasswordDto } from "../users/dto/verify-reset-password.dto";
import * as uuid from "uuid";
import * as md5 from "md5";
import { InjectModel } from '@nestjs/sequelize';
import { externalAuthMethods } from 'src/external-auth/interfaces/external-auth-type.interface';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private rolesService: RolesService,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private httpService: HttpService,
    @InjectModel(ExternalAuth) private externalAuthRepository: typeof ExternalAuth,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return await this.generateToken(user);
  }

  async externalAuthorization(type: externalAuthMethods) {
    if(+type === externalAuthMethods.VK) {
      return {
        url: `https://oauth.vk.com/authorize?client_id=${process.env.VK_CLIENT_ID}&client_secret=${process.env.VK_SECRET_KEY}&display=page&redirect_uri=${process.env.FRONTEND_URL}&scope=friends&response_type=code&v=5.131&scope=email,photos&state=${externalAuthMethods.VK}`,
      }
    }
  }

  private async getExternalUser(code: string, type: externalAuthMethods) {
    if(+type === externalAuthMethods.VK) {
      const request = await this.httpService.get(
        `https://oauth.vk.com/access_token?client_id=${process.env.VK_CLIENT_ID}&client_secret=${process.env.VK_SECRET_KEY}&redirect_uri=${process.env.FRONTEND_URL}&code=${code}&state=${externalAuthMethods.VK}`
        ).toPromise();
      const userInfoRequest = await this.httpService.get(
        `https://api.vk.com/method/users.get?user_ids=${request.data.user_id}&access_token=${request.data.access_token}&fields=photo_200&v=5.131`
        ).toPromise();
      console.log(userInfoRequest.data.response[0].photo_200);
      return await this.externalLogin(userInfoRequest.data.response[0], request.data.email);
    }
  }

  private async externalLogin(ExternalUserInfo, email) {
    const externalId = ExternalUserInfo.id;
    const lastName = ExternalUserInfo.last_name;
    const firstName = ExternalUserInfo.first_name;

    const candidate = await this.externalAuthRepository.findOne({
      where: {
        external_id: externalId,
      },
      include: [
        {
          model: User,
          include: [
            {
              model: Role
            }
          ]
        }
      ],
    });

    if(!candidate) {
      const external = await this.externalAuthRepository.create({
        external_id: externalId,
        auth_method: externalAuthMethods.VK
      });
      const newUser = await this.userRepository.create({
        email,
        lastName,
        name: firstName,
        password: '',
        activation_code: ''
      });
      console.log(555555555555555555555555555555555555);
      const role = await this.rolesService.getRoleByValue("STUDENT");
      await newUser.$set("roles", [role.id]);
      await external.$set("user", [newUser.id]);
      newUser.roles = [role];
      return newUser;
    }else{
      return candidate.user;
    }
  }

  async getUser(id) {
    const user = await this.userService.getUserById(id);

    if (user) return user;

    throw new HttpException(
      "Пользователь с таким id не найден",
      HttpStatus.NOT_FOUND
    );
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        "Пользователь с таким email уже существует",
        HttpStatus.BAD_REQUEST
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 1);
    const activationCode = uuid.v4();
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    }, activationCode);
    //this.sendConfirmEmail(user);
    return this.generateToken(user);
  }

  async sendConfirmEmail(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      const activateCode = candidate.activation_code;
      return await this.mailerService.sendMail({
        to: candidate.email,
        from: process.env.SMTP_FROM,
        subject: "Подтверждение почты",
        template: `reset-password`,
        context: {
          name: candidate.name,
          link: `${process.env.RESET_PASSWORD_DOMAIN}/activation/${activateCode}`,
        },
      });
    }
    throw new HttpException(
      "Пользователь с таким email не существует",
      HttpStatus.BAD_REQUEST
    );
  }

  async sendResetEmail(userDto: ResetPasswordDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      const resetCode = await md5(md5(userDto.email + process.env.SMTP));
      await candidate.update({
        email_reset_code: resetCode,
      });
      return await this.mailerService.sendMail({
        to: candidate.email,
        from: process.env.SMTP_FROM,
        subject: "Восстановление забытого пароля",
        template: `reset-password`,
        context: {
          name: candidate.name,
          link: `${process.env.RESET_PASSWORD_DOMAIN}/?email=${candidate.email}&reset-code=${resetCode}`,
        },
      });
    }
    throw new HttpException(
      "Пользователь с таким email не существует",
      HttpStatus.BAD_REQUEST
    );
  }

  async resetPassword(userDto: VerifyResetPasswordDto) {
    const candidate = await this.userService.resetPassword(userDto);
    if (candidate) {
      await this.mailerService.sendMail({
        to: candidate.email,
        from: process.env.SMTP_FROM,
        subject: "Пароль успешно восстановлен",
        template: `success-reset-password`,
        context: {
          newPassword: candidate.password,
        },
      });
      return "Новый пароль отправлен вам на электронную почту!";
    }
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      roles: user.roles,
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    if(userDto.type) {
      return this.getExternalUser(userDto.password, userDto.type);
    }
    const user = await this.userService.getUserByEmail(userDto.email);
    if (user) {
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user?.password
      );
      if (passwordEquals) {
        return user;
      }
    }
    throw new UnauthorizedException({ message: "Не верный email или пароль" });
  }
}
