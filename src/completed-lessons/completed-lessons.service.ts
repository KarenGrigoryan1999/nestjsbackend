import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {CompletedLesson} from "./completed-lessons.model";

@Injectable()
export class CompletedLessonsService {
    constructor(@InjectModel(CompletedLesson) private courseRepository: typeof CompletedLesson) {}
    
    
}
