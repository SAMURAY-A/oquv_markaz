import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffGroupDto } from './dto/create-staff_group.dto';
import { UpdateStaffGroupDto } from './dto/update-staff_group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Staff_group } from './staff_group.model';

@Injectable()
export class StaffGroupService {
  constructor(
    @InjectModel(Staff_group)
    private readonly staff_groupModel: typeof Staff_group,
  ) {}
  create(createStaffGroupDto: CreateStaffGroupDto) {
    return this.staff_groupModel.create(createStaffGroupDto);
  }

  findAll() {
    return this.staff_groupModel.findAll();
  }

  findOne(id: number) {
    return this.staff_groupModel.findByPk(id);
  }

  async update(id: number, updateStaffGroupDto: UpdateStaffGroupDto) {
    const [updated] = await this.staff_groupModel.update(updateStaffGroupDto, {
      where: { id },
    });
    if (updated === 0) {
      throw new NotFoundException(`staff_group with ID ${id} not found`);
    }
  }

  remove(id: number) {
    return this.staff_groupModel.destroy({ where: { id } });
  }
}
