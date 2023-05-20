import { RolesModule } from './../roles/roles.module';
import {forwardRef, Module} from "@nestjs/common";
import { HttpModule } from '@nestjs/axios'
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { ExternalAuth } from "src/external-auth/external-auth.model";
import { User } from "src/users/users.model";
import { XFields } from 'src/xfields/xfields.model';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || "SECRET",
            signOptions: {
                expiresIn: "24h",
            },
        }),
        forwardRef(() => RolesModule),
        HttpModule,
        SequelizeModule.forFeature([ExternalAuth, User, XFields])
    ],
    exports: [AuthService, JwtModule],
})
export class AuthModule {
}
