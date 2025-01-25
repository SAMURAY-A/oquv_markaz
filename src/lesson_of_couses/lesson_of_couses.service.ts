import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonOfCouseDto } from './dto/create-lesson_of_couse.dto';
import { UpdateLessonOfCouseDto } from './dto/update-lesson_of_couse.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson_of_couses } from './lesson_of_couses.model';
import { Homework } from 'src/homework/homework.model';
import { Videos } from 'src/videos/videos.model';
import { Homework_file } from 'src/homework_files/homework_files.model';

@Injectable()
export class LessonOfCousesService {
  constructor(
    @InjectModel(Lesson_of_couses)
    private readonly lesson_of_cousesModel: typeof Lesson_of_couses,
  ) {}
  create(createLessonOfCouseDto: CreateLessonOfCouseDto) {
    return this.lesson_of_cousesModel.create(createLessonOfCouseDto);
  }

  findAll() {
    return this.lesson_of_cousesModel.findAll({
      include: [
        { model: Homework, include: [{ model: Homework_file }] },
        { model: Videos },
      ],
    });
  }

  findOne(id: number) {
    return this.lesson_of_cousesModel.findByPk(id, {
      include: [
        { model: Homework, include: [{ model: Homework_file }] },
        { model: Videos },
      ],
    });
  }

  async update(id: number, updateLessonOfCouseDto: UpdateLessonOfCouseDto) {
    const [updated] = await this.lesson_of_cousesModel.update(
      updateLessonOfCouseDto,
      { where: { id } },
    );
    if (updated === 0) {
      throw new NotFoundException(`lesson_if_course with ID ${id} not found`);
    }
  }

  remove(id: number) {
    return this.lesson_of_cousesModel.destroy({ where: { id } });
  }
}
