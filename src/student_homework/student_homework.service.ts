import { Injectable } from '@nestjs/common';
import { CreateStudentHomeworkDto } from './dto/create-student_homework.dto';
import { UpdateStudentHomeworkDto } from './dto/update-student_homework.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Student_homework } from './student_homework.model';
import { Student_homework_file } from 'src/student_homework_file/student_homework_file.model';
import { Homework_ball } from 'src/homework_ball/homework_ball.model';
import { Homework } from 'src/homework/homework.model';
import { Lesson_of_couses } from 'src/lesson_of_couses/lesson_of_couses.model';
import { Homework_file } from 'src/homework_files/homework_files.model';

@Injectable()
export class StudentHomeworkService {
  constructor(
    @InjectModel(Student_homework)
    private readonly student_homeworkModel: typeof Student_homework,
  ) {}
  create(createStudentHomeworkDto: CreateStudentHomeworkDto) {
    return this.student_homeworkModel.create(createStudentHomeworkDto);
  }

  findAll() {
    return this.student_homeworkModel.findAll({
      include: [
        { model: Student_homework_file },
        { model: Homework_ball },
        {
          model: Homework,
          include: [{ model: Lesson_of_couses }, { model: Homework_file }],
        },
      ],
    });
  }

  findOne(id: number) {
    return this.student_homeworkModel.findByPk(id, {
      include: [
        { model: Student_homework_file },
        { model: Homework_ball },
        {
          model: Homework,
          include: [{ model: Lesson_of_couses }, { model: Homework_file }],
        },
      ],
    });
  }

  async update(id: number, updateStudentHomeworkDto: UpdateStudentHomeworkDto) {
    await this.student_homeworkModel.update(updateStudentHomeworkDto, {
      where: { id },
    });
    return this.findOne(id);
  }

  remove(id: number) {
    return this.student_homeworkModel.destroy({ where: { id } });
  }
}
