import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Import Swagger decorators
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LogInStudentDto } from './dto/login-student.dto';
import { Roles } from 'src/common/guard/role.decorator';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { Role, RolesGuard } from 'src/common/guard/role.guard';

@ApiTags('Students')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ summary: 'Register a new student' })
  @ApiResponse({
    status: 201,
    description: 'The student has been successfully registered.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post('register')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({ summary: 'Login a student' })
  @ApiResponse({
    status: 200,
    description: 'The student has successfully logged in.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post('login')
  login(@Body() loginStudentDto: LogInStudentDto) {
    return this.studentService.login(loginStudentDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all students (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all students.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Roles(Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get a specific student' })
  @ApiResponse({
    status: 200,
    description: 'Student data retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update student information (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Student information updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Roles(Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete a student record' })
  @ApiResponse({ status: 200, description: 'Student successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
