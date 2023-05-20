import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "./users.model";
import {RolesService} from "../roles/roles.service";
import {VerifyResetPasswordDto} from "./dto/verify-reset-password.dto";
import * as passwordGenerator from "generate-password";
import * as bcrypt from "bcryptjs";
import {UpdateUserDto} from "./dto/update-user.dto";
import { XFields } from "src/xfields/xfields.model";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        @InjectModel(XFields) private xFieldsRepository: typeof XFields,
        private rolesService: RolesService
    ) {
    }

    async createUser(dto: CreateUserDto, activation_code: string) {
        const xFields = await this.xFieldsRepository.findOne({
            where: {
                code: 'rewardCount'
            }
        });
        const user = await this.userRepository.create({
            ...dto,
            balance: +xFields.value,
            activation_code,
        });
        const role = await this.rolesService.getRoleByValue("STUDENT");
        await user.$set("roles", [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUsers(page, perPage) {
        const users = await this.userRepository.findAndCountAll({
            include: {all: true},
            limit: Number(perPage),
            offset:
                Number(page) === 1
                    ? 0
                    : Number(page) * Number(perPage) - Number(perPage),
        });

        return {
            count: users.count,
            users: users.rows,
        };
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({
            where: {email},
            include: {all: true},
        });
    }

    async getUserById(id: string) {
        return await this.userRepository.findOne({
            where: {id},
            include: {all: true},
            attributes: {
                exclude: ["password"],
            },
        });
    }

    async getFreeCourse(userId: string, courseId: number) {
        const user = await this.getUserById(userId);
        
        await user.$add("courses", +courseId);
        
        return user;
    }

    async confirmEmail(code: string) {
        const user = await this.userRepository.findOne({
            where: {activation_code: code},
        });
        if (user) {
            await user.update({
                activation_code: '',
                email_confirmed: true,
            });
            return {
                activated: true,
            };
        }
        throw new HttpException("Произошла ошибка", HttpStatus.BAD_REQUEST);
    }

    async updateUser(dto: UpdateUserDto) {
        const user = await this.userRepository.findByPk(dto.id);
        await this.userRepository.update(dto, {where: {id: dto.id}});
        return user;
    }

    async resetPassword(userDto: VerifyResetPasswordDto) {
        const user = await this.userRepository.findOne({
            where: {email: userDto.email, email_reset_code: userDto.code},
        });
        if (user) {
            const password = passwordGenerator.generate({
                length: 8,
                numbers: true,
            });
            await user.update({
                password: await bcrypt.hash(password, 5),
                email_reset_code: "",
            });
            return {
                email: user.email,
                password,
            };
        }
        throw new HttpException("Произошла ошибка", HttpStatus.BAD_REQUEST);
    }
}
