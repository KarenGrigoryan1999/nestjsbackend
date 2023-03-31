import {Body, Controller, Get, Param, Post, Put, Query, UseGuards, Request} from "@nestjs/common";
import {Roles} from "src/auth/roles-auth.decorator";
import {UsersService} from "./users.service";
import {RolesGuard} from "../auth/roles.guard";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller("api/users")
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll(@Query("page") page: string, @Query("perPage") perPage: string) {
        return this.userService.getAllUsers(page, perPage);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get("/:id")
    getUser(@Param("id") userId: string) {
        return this.userService.getUserById(userId);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put()
    updateUser(@Body() dto: UpdateUserDto) {
        return this.userService.updateUser(dto);
    }

    @Roles("ADMIN", "STUDENT")
    @UseGuards(RolesGuard)
    @Post("/get-free-course")
    getFreeCourse(@Request() req, @Body() data) {
        const userId = req.user.id;
        return this.userService.getFreeCourse(userId, data.courseId);
    }
}
