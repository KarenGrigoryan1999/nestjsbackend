import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Question } from './../questions/question.model';
import { CompleteTestDto } from './dto/complete-test.dto';
import { CreateTestDto } from "./dto/create-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";
import { Test } from "./tests.model";
import { Result } from 'src/results/results.model';
import { User } from 'src/users/users.model';

@Injectable()
export class TestsService {
  constructor(
    @InjectModel(Test) private testsRepository: typeof Test,
    @InjectModel(Result) private resultsRepository: typeof Result,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  async getAll() {
    return await this.testsRepository.findAll();
  }

  async getOneById(id) {
    return await this.testsRepository.findByPk(id, {include: [{
      model: Question,
    }] });
  }

  async completeTest(dto: CompleteTestDto, userId: number) {
    const result = await this.resultsRepository.findOne({
      where: {
        testId: dto.testId
      },
      include: [{
        model: User,
        where: {
          id: userId
        }
      }]
    });

    if(!result) {
      const newResult = await this.resultsRepository.create({
        result: dto.result,
        testId: dto.testId
      });

      const user = await this.userRepository.findByPk(userId);
      await this.userRepository.update({
        balance: user.balance + dto.result,
      }, {
        where: {
          id: userId
        }
      });

      newResult.$set("users", [userId]);

      return newResult;
    }

    return result;
  }

  async createTest(test: CreateTestDto) {
    const newTest = await this.testsRepository.create(test);

    if (newTest) {
      newTest.$set("questions", test.questions);
    }

    return newTest;
  }

  async updateTest(test: UpdateTestDto) {
    const editedTest = await this.testsRepository.findByPk(test.id);

    if (editedTest) {
      await this.testsRepository.update(test, {
        where: { id: test.id },
      });

      console.log(test.questions);
      editedTest.$set("questions", test.questions);

      return {
        success: true,
      };
    }

    throw new HttpException("Такой курс не найден", HttpStatus.NOT_FOUND);
  }

  async checkTest(test) {
    const currentTest = await this.testsRepository.findByPk(test.testId, {include: {all: true, nested: true}});
    let correctPointCount = 0;

    for(let i = 0; i < test.questions.length; i++) {
      const selected = test.questions[i][`answer_${test.questions[i].selectAnswer}`] || test.questions[i].selectAnswer;
      if(selected.toLowerCase() === currentTest.questions[i].correct_answer.toLowerCase()) {
          correctPointCount += currentTest.questions[i].cost;
      }
    }
    return {
      result: correctPointCount,
    };
  }

  async deleteTest(id: string) {
    const candidate = await this.testsRepository.destroy({
      where: { id: +id },
    });
    if (candidate)
      return {
        id: +id,
        deleted: true,
      };

    throw new HttpException(
      "Такой тест не найден",
      HttpStatus.NOT_FOUND
    );
  }
}
