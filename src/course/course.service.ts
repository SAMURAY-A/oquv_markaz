import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './course.model';
import { Category } from 'src/category/category.model';
import { Staff } from 'src/staff/staff.model';
import { Group } from 'src/group/group.model';
import { Student } from 'src/student/student.model';
@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private readonly courseModel: typeof Course,
  ) {}
  create(createCourseDto: CreateCourseDto) {
    return this.courseModel.create(createCourseDto);
  }

  findAll() {
    return this.courseModel.findAll({
      include: [
        {
          model: Category,
        },
        {
          model: Staff,
        },
        {
          model: Group,
          include: [
            {
              model: Staff,
            },
            {
              model: Student,
            },
          ],
        },
      ],
    });
  }

  findOne(id: number) {
    return this.courseModel.findByPk(id, {
      include: [
        {
          model: Category,
        },
        {
          model: Staff,
        },
        {
          model: Group,
          include: [
            {
              model: Staff,
            },
            {
              model: Student,
            },
          ],
        },
      ],
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const [updated] = await this.courseModel.update(updateCourseDto, {
      where: { id },
    });
    if (updated === 0) {
      throw new NotFoundException(`course with ID ${id} not found`);
    }
    return this.findOne(id);
  }
  remove(id: number) {
    return this.courseModel.destroy({ where: { id } });
  }
}
