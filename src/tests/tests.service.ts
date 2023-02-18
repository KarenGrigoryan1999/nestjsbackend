import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateTestDto } from "./dto/create-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";
import { Test } from "./tests.model";

@Injectable()
export class TestsService {
  constructor(@InjectModel(Test) private testsRepository: typeof Test) {}

  async getAll() {
    return await this.testsRepository.findAll();
  }

  async getOneById(id) {
    return await this.testsRepository.findByPk(id, { include: { all: true } });
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

      await editedTest.$set("questions", test.questions);

      return {
        success: true,
      };
    }

    throw new HttpException("Такой курс не найден", HttpStatus.NOT_FOUND);
  }
}
