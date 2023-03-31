import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors,} from "@nestjs/common";
import {TeachersService} from "./teachers.service";
import {createTeacherDto} from "./dto/create-teacher.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {updateTeacherDto} from "./dto/update-teacher.dto";

@Controller("api/teachers")
export class TeachersController {
  constructor(private teacherService: TeachersService) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: createTeacherDto) {
    return this.teacherService.createTeacher(dto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put()
  update(@Body() dto: updateTeacherDto) {
    return this.teacherService.updateTeacher(dto);
  }

  @Get()
  getAll() {
    return this.teacherService.getAllTeachers();
  }

  @Get("/:id")
  getTeacher(@Param("id") id: string) {
    return this.teacherService.getTeacherById(id);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete("/:id")
  deleteTeacher(@Param("id") id: string) {
    return this.teacherService.deleteTeacherById(id);
  }
}
