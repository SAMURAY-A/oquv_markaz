import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHomeworkBallDto } from './dto/create-homework_ball.dto';
import { UpdateHomeworkBallDto } from './dto/update-homework_ball.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Homework_ball } from './homework_ball.model';

@Injectable()
export class HomeworkBallService {
  constructor(
    @InjectModel(Homework_ball)
    private readonly homework_ballModel: typeof Homework_ball,
  ) {}
  create(createHomeworkBallDto: CreateHomeworkBallDto) {
    return this.homework_ballModel.create(createHomeworkBallDto);
  }

  findAll() {
    return this.homework_ballModel.findAll();
  }

  findOne(id: number) {
    return this.homework_ballModel.findByPk(id);
  }

  async update(id: number, updateHomeworkBallDto: UpdateHomeworkBallDto) {
    const [updated] = await this.homework_ballModel.update(
      updateHomeworkBallDto,
      { where: { id } },
    );
    if (updated === 0) {
      throw new NotFoundException(`homework_ball with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  remove(id: number) {
    return this.homework_ballModel.destroy({ where: { id } });
  }
}
