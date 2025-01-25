import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHomeworkFileDto } from './dto/create-homework_file.dto';
import { UpdateHomeworkFileDto } from './dto/update-homework_file.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Homework_file } from './homework_files.model';

@Injectable()
export class HomeworkFilesService {
  constructor(
    @InjectModel(Homework_file)
    private readonly homework_fileModel: typeof Homework_file,
  ) {}
  create(createHomeworkFileDto: CreateHomeworkFileDto) {
    return this.homework_fileModel.create(createHomeworkFileDto);
  }

  findAll() {
    return this.homework_fileModel.findAll();
  }

  findOne(id: number) {
    return this.homework_fileModel.findByPk(id);
  }

  async update(id: number, updateHomeworkFileDto: UpdateHomeworkFileDto) {
    const [updated] = await this.homework_fileModel.update(
      updateHomeworkFileDto,
      { where: { id } },
    );
    if (updated === 0) {
      throw new NotFoundException(`Homework_file with ID ${id} not found`);
    }
    return await this.findOne(id);
  }

  remove(id: number) {
    return this.homework_fileModel.destroy({ where: { id } });
  }
}
