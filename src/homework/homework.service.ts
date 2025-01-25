import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Homework } from './homework.model';
import { Lesson_of_couses } from 'src/lesson_of_couses/lesson_of_couses.model';
import { Homework_file } from 'src/homework_files/homework_files.model';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectModel(Homework) private readonly homeworkModel: typeof Homework,
  ) {}
  create(createHomeworkDto: CreateHomeworkDto) {
    return this.homeworkModel.create(createHomeworkDto);
  }

  findAll() {
    return this.homeworkModel.findAll({
      include: [
        {
          model: Lesson_of_couses,
        },
        {
          model: Homework_file,
        },
      ],
    });
  }

  findOne(id: number) {
    return this.homeworkModel.findByPk(id, {
      include: [
        {
          model: Lesson_of_couses,
        },
        {
          model: Homework_file,
        },
      ],
    });
  }

  async update(id: number, updateHomeworkDto: UpdateHomeworkDto) {
    const [updated] = await this.homeworkModel.update(updateHomeworkDto, {
      where: { id },
    });
    if (updated === 0) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  remove(id: number) {
    return this.homeworkModel.destroy({ where: { id } });
  }
}
