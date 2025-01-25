import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StudentHomeworkService } from './student_homework.service';
import { CreateStudentHomeworkDto } from './dto/create-student_homework.dto';
import { UpdateStudentHomeworkDto } from './dto/update-student_homework.dto';
import { Roles } from 'src/common/guard/role.decorator';
import { Role, RolesGuard } from 'src/common/guard/role.guard';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Student Homework') 
@Controller('student-homework')
export class StudentHomeworkController {
  constructor(
    private readonly studentHomeworkService: StudentHomeworkService,
  ) {}

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Create a student homework submission' })
  @ApiResponse({
    status: 201,
    description:
      'The student homework submission has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createStudentHomeworkDto: CreateStudentHomeworkDto) {
    return this.studentHomeworkService.create(createStudentHomeworkDto);
  }

  @Roles(Role.ADMIN, Role.TEACHER, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Get all student homework submissions' })
  @ApiResponse({
    status: 200,
    description: 'All student homework submissions have been fetched.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll(@Req() req) {
    console.log('reqdfzzbdfhd');
    return this.studentHomeworkService.findAll();
  }

  @Roles(Role.ADMIN, Role.TEACHER, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a student homework submission by ID' })
  @ApiResponse({
    status: 200,
    description:
      'The student homework submission has been successfully fetched.',
  })
  @ApiResponse({
    status: 404,
    description: 'Student homework submission not found.',
  })
  findOne(@Param('id') id: string) {
    return this.studentHomeworkService.findOne(+id);
  }

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing student homework submission' })
  @ApiResponse({
    status: 200,
    description:
      'The student homework submission has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Student homework submission not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateStudentHomeworkDto: UpdateStudentHomeworkDto,
  ) {
    return this.studentHomeworkService.update(+id, updateStudentHomeworkDto);
  }

  @Roles(Role.ADMIN, Role.TEACHER, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student homework submission' })
  @ApiResponse({
    status: 200,
    description:
      'The student homework submission has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Student homework submission not found.',
  })
  remove(@Param('id') id: string) {
    return this.studentHomeworkService.remove(+id);
  }
}
