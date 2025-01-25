import { Injectable } from '@nestjs/common';
import { CreateStudentHomeworkFileDto } from './dto/create-student_homework_file.dto';
import { UpdateStudentHomeworkFileDto } from './dto/update-student_homework_file.dto';

@Injectable()
export class StudentHomeworkFileService {
  create(createStudentHomeworkFileDto: CreateStudentHomeworkFileDto) {
    return 'This action adds a new studentHomeworkFile';
  }

  findAll() {
    return `This action returns all studentHomeworkFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentHomeworkFile`;
  }

  update(id: number, updateStudentHomeworkFileDto: UpdateStudentHomeworkFileDto) {
    return `This action updates a #${id} studentHomeworkFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentHomeworkFile`;
  }
}
