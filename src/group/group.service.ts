import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './group.model';
import { Student } from 'src/student/student.model';
import { Staff_group } from 'src/staff_group/staff_group.model';
import { Staff } from 'src/staff/staff.model';
import { Course } from 'src/course/course.model';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group) private readonly groupModel: typeof Group) {}
  create(createGroupDto: CreateGroupDto) {
    return this.groupModel.create(createGroupDto);
  }

  findAll() {
    return this.groupModel.findAll({
      include: [
        {
          model: Student,
        },
        {
          model: Staff,
        },
        {
          model: Course,
        },
      ],
    });
  }

  findOne(id: number) {
    return this.groupModel.findByPk(id, {
      include: [
        {
          model: Student,
        },
        {
          model: Staff,
        },
        {
          model: Course,
        },
      ],
    });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const [updated] = await this.groupModel.update(updateGroupDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.groupModel.destroy({ where: { id } });
  }
}


