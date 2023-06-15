import { Course } from './../courses/courses.model';
import { LessonsUsers } from './lessons-users.model';
import {BelongsTo, BelongsToMany, Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {LessonsVideos} from "../files/types/lessons-videos.model";
import {File} from "../files/files.model";
import { Question } from "src/questions/question.model";
import { User } from "src/users/users.model";
import { CoursesLessons } from 'src/courses/courses-lessons.model';

interface LessonCreationAttrs {
    name: string;
    position: number;
}

@Table({tableName: 'lessons'})
export class Lesson extends Model<Lesson, LessonCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @Column({type: DataType.STRING})
    name: string;

    @Column({ type: DataType.INTEGER })
    position: number; 
    
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    free: boolean; 
    
    @BelongsToMany(() => File, () => LessonsVideos)
    video: File[]

    @BelongsToMany(() => Course, () => CoursesLessons)
    courses: Course[];
    
    @HasOne(() => Question)
    question: Question;

    @BelongsToMany(() => User, () => LessonsUsers)
    user: User[];
}