import { CompleteTestDto } from './dto/complete-test.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateTestDto } from "./dto/create-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";
import { Test } from "./tests.model";
import { Result } from 'src/results/results.model';
import { User } from 'src/users/users.model';

@Injectable()
export class TestsService {
  constructor(
    @InjectModel(Test) private testsRepository: typeof Test,
    @InjectModel(Result) private resultsRepository: typeof Result
  ) {}

  async getAll() {
    return await this.testsRepository.findAll();
  }

  async getOneById(id) {
    return await this.testsRepository.findByPk(id, { include: { all: true, nested: true } });
  }

  async completeTest(dto: CompleteTestDto, userId: number) {
    console.log(dto.testId);
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

    if(result) {
      await result.update({
        result: dto.result
      });
    } else {
      const newResult = await this.resultsRepository.create({
        result: dto.result,
        testId: dto.testId
      });

      newResult.$set("users", [userId]);
      console.log('new', newResult);

      return newResult;
    }

    console.log('update', result);
    return result;
  }

  async createTest(test: CreateTestDto) {
    const newTest = await this.testsRepository.create(test);

    if (newTest) {
      newTest.$set("questions", test.questions);
    }
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
}
