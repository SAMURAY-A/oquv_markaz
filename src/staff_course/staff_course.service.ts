import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffCourseDto } from './dto/create-staff_course.dto';
import { UpdateStaffCourseDto } from './dto/update-staff_course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Staff_course } from './staff_course.model';

@Injectable()
export class StaffCourseService {
  constructor(
    @InjectModel(Staff_course)
    private readonly staff_courseModel: typeof Staff_course,
  ) {}
  create(createStaffCourseDto: CreateStaffCourseDto) {
    return this.staff_courseModel.create(createStaffCourseDto);
  }

  findAll() {
    return this.staff_courseModel.findAll();
  }

  findOne(id: number) {
    return this.staff_courseModel.findByPk(id);
  }

  async update(id: number, updateStaffCourseDto: UpdateStaffCourseDto) {
    const [updated] = await this.staff_courseModel.update(
      updateStaffCourseDto,
      { where: { id } },
    );
    if (updated === 0) {
      throw new NotFoundException(`staff_course with ID ${id} not found`);
    }
  }

  remove(id: number) {
    return this.staff_courseModel.destroy({ where: { id } });
  }
}
