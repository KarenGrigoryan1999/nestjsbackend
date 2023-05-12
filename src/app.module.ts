import {Module} from "@nestjs/common";
import { ExternalAuth } from './external-auth/external-auth.model';
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from "./users/users.module";
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import {RolesModule} from "./roles/roles.module";
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import {AuthModule} from "./auth/auth.module";
import {MailerModule} from "@nestjs-modules/mailer";
import {PugAdapter} from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import * as path from "path";
import {TeachersModule} from "./teachers/teachers.module";
import {Teacher} from "./teachers/teachers.model";
import {FilesModule} from "./files/files.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import {CoursesModule} from "./courses/courses.module";
import {Course} from "./courses/courses.model";
import {TeacherCourses} from "./teachers/teacher-courses.model";
import {File} from "./files/files.model";
import {TeacherPhotos} from "./files/types/teacher-photos.model";
import {TeacherVideos} from "./files/types/teacher-videos.model";
import {CoursesFiles} from "./files/types/courses-files.model";
import {CoursesPhotos} from "./files/types/courses-photos.model";
import {LessonsModule} from "./lessons/lessons.module";
import {Lesson} from "./lessons/lessons.model";
import {LessonsVideos} from "./files/types/lessons-videos.model";
import {CoursesLessons} from "./courses/courses-lessons.model";
import {QuestionsModule} from "./questions/questions.module";
import {Question} from "./questions/question.model";
import {S3Module} from "nestjs-s3";
import {Test} from "./tests/tests.model";
import {TestsQuestions} from "./tests/tests-questions.model";
import {TestsModule} from "./tests/tests.module";
import {CoursesTests} from "./courses/courses-tests.model";
import {UserCourses} from "./users/user-courses.model";
import {XFieldsModule} from "./xfields/xfields.module";
import {XFields} from "./xfields/xfields.model";
import {ShopModule} from "./shop/shop.module";
import {Shop} from "./shop/shop.model";
import {ShopImages} from "./shop/shop-images.model";
import {TeacherVideoPreview} from "./files/types/teacher-video-preview.model";
import {UserAvatars} from "./files/types/user-avatars.model";
import {CartModule} from "./cart/cart.module";
import {Cart} from "./cart/cart.model";
import {CompletedLesson} from "./completed-lessons/completed-lessons.model";
import {CompletedLessonsModule} from "./completed-lessons/completed-lessons.module";
import { MainPageFieldsModule } from './main-page-fields/main-page-fields.module';
import { MainPageFields } from "./main-page-fields/main-page-fields.model";
import { ExternalAuthModule } from './external-auth/external-auth.module';
import { LessonsUsers } from './lessons/lessons-users.model';
import { QuestionPhotos } from './files/types/question-photos.model';
import { ResultsModule } from './results/results.module';
import { Result } from './results/results.model';
import { UserResults } from './results/user-results.model';
import { LearnStagesModule } from './learn-stages/learn-stages.module';
import { LearnStagesPhotos } from './learn-stages/learn-stages-photos.dto';
import { PromoModule } from './promo/promo.module';
import { Promo } from './promo/promo.model';
import { Payment } from './payments/payments.model';
import { StatisticModule } from './statistic/statistic.module';
import { GiftsModule } from './gifts/gifts.module';
import { Gifts } from './gifts/gifts.model';
import { ShopGifts } from './gifts/shop-gifts.model';
import { Statistic } from './statistic/static.model';
import { StatisticCourse } from './statistic/statistic-course.model';
import { PaymentsModule } from './payments/payments.module';
import { PaymentsCourses } from './payments/payments-courses.model';
import { CallsModule } from './calls/calls.module';
import { Call } from "./calls/calls.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, "static"),
        }),
        SequelizeModule.forRoot({
            dialect: "mysql",
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            define: {
                charset: "utf8",
                collate: "utf8_general_ci",
            },
            models: [
                User,
                Role,
                UserRoles,
                UserCourses,
                Teacher,
                Course,
                TeacherCourses,
                File,
                Call,
                TeacherPhotos,
                QuestionPhotos,
                TeacherVideos,
                TeacherVideoPreview,
                CoursesFiles,
                CoursesPhotos,
                Lesson,
                LessonsVideos,
                LearnStagesPhotos,
                LessonsUsers,
                CoursesLessons,
                CoursesTests,
                Question,
                Test,
                TestsQuestions,
                ShopGifts,
                XFields,
                Shop,
                ShopImages,
                UserAvatars,
                Cart,
                Gifts,
                CompletedLesson,
                MainPageFields,
                StatisticCourse,
                PaymentsCourses,
                Payment,
                Result,
                Promo,
                Statistic,
                UserResults,
                ExternalAuth,
            ],
            autoLoadModels: true,
            synchronize: true,
        }),
        MailerModule.forRoot({
            transport: 'smtp.mail.ru',
            defaults: {
                from: process.env.SMTP_FROM,
            },
            template: {
                dir: process.cwd() + "/src/templates/",
                adapter: new PugAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
        S3Module.forRoot({
            config: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                endpoint: process.env.AWS_ENDPOINT,
                s3ForcePathStyle: true,
                signatureVersion: "v4",
                region: "ru-msk",
                apiVersion: "latest",
            },
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        TeachersModule,
        FilesModule,
        CoursesModule,
        LessonsModule,
        QuestionsModule,
        TestsModule,
        XFieldsModule,
        ShopModule,
        CartModule,
        CompletedLessonsModule,
        MainPageFieldsModule,
        ExternalAuthModule,
        ResultsModule,
        LearnStagesModule,
        PromoModule,
        StatisticModule,
        GiftsModule,
        PaymentsModule,
        CallsModule,
    ],
})
export class AppModule {
}
