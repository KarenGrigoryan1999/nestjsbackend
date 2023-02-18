import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Request,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { ResetPasswordDto } from "../users/dto/reset-password.dto";
import { VerifyResetPasswordDto } from "src/users/dto/verify-reset-password.dto";
import { Roles } from "./roles-auth.decorator";
import { RolesGuard } from "./roles.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @Get("/external-authorization/:type")
  @Redirect()
  externalAuthorization(@Param("type") type) {
    return this.authService.externalAuthorization(type);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/user")
  user(@Request() req) {
    return this.authService.getUser(req.user.id);
  }

  @Post("/registration")
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Post("/reset-password")
  sendResetEmail(@Body() userDto: ResetPasswordDto) {
    return this.authService.sendResetEmail(userDto);
  }

  @Get("/reset-password/:email/:code")
  resetPassword(@Param() userDto: VerifyResetPasswordDto) {
    return this.authService.resetPassword(userDto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/check-admin")
  checkRights() {
    return {
      status: true,
    };
  }
}
