import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Response,
    StreamableFile,
    Request,
    UseGuards,
} from '@nestjs/common';
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {join} from "path";
import fs, {createReadStream} from "fs";
import fileType from "magic-bytes.js";
import {CoursesService} from "./courses.service";
import {CreateCourseDto} from "./dto/create-course.dto";
import {EditCourseDto} from "./dto/edit-course.dto";

@Controller('api/courses')
export class CoursesController {
    constructor(private coursesService: CoursesService) {}
    
    @Get()
    getAllCourses() {
        return this.coursesService.getAllCourses();
    }

    @Roles("ADMIN", "STUDENT")
    @UseGuards(RolesGuard)
    @Get('/my')
    getCourses(@Request() req) {
        const userId = req.user.id;
        return this.coursesService.getCourse(userId);
    }

    @Get('/:id')
    getCourse(@Param('id') id: number) {
        return this.coursesService.getCourse(id);
    }

    @Roles("ADMIN", "STUDENT")
    @UseGuards(RolesGuard)
    @Get('my/:id')
    getUserCourseInfo(@Request() req, @Param('id') id: number) {
        return this.coursesService.getUserCourseInfo(id, req.user);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    createCourse(@Body() dto: CreateCourseDto) {
        return this.coursesService.createCourse(dto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put()
    editCourse(@Body() dto: EditCourseDto) {
        return this.coursesService.editCourse(dto);
    }

    @Roles("ADMIN", "STUDENT")
    @UseGuards(RolesGuard)
    @Get("/get-video/:file")
    getFile(
        @Response({passthrough: true}) res,
        @Param("file") fileName: string
    ): StreamableFile {
        const filePath = join(process.cwd(), "dist", "static", "api", fileName);
        const fileStream = createReadStream(filePath);
        const fileMetadata = fileType(fs.readFileSync(filePath));

        res.set({
            "Content-Type": fileMetadata[0].mime
        });
        return new StreamableFile(fileStream);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete("/:id")
    deleteTeacher(@Param("id") id: number) {
        return this.coursesService.deleteCourse(id);
    }
}
