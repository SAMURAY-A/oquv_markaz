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
import { StudentGroupService } from './student_group.service';
import { CreateStudentGroupDto } from './dto/create-student_group.dto';
import { UpdateStudentGroupDto } from './dto/update-student_group.dto';
import { Roles } from 'src/common/guard/role.decorator';
import { Role, RolesGuard } from 'src/common/guard/role.guard';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Student Groups') 
@Controller('student-group')
export class StudentGroupController {
  constructor(private readonly studentGroupService: StudentGroupService) {}

  @Roles(Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new student-group association' })
  @ApiResponse({
    status: 201,
    description: 'The student-group association has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createStudentGroupDto: CreateStudentGroupDto) {
    return this.studentGroupService.create(createStudentGroupDto);
  }

  @Roles(Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Get all student-group associations' })
  @ApiResponse({
    status: 200,
    description: 'All student-group associations have been fetched.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll() {
    return this.studentGroupService.findAll();
  }

  @Roles(Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a student-group association by ID' })
  @ApiResponse({
    status: 200,
    description: 'The student-group association has been successfully fetched.',
  })
  @ApiResponse({
    status: 404,
    description: 'Student-group association not found.',
  })
  findOne(@Param('id') id: string) {
    return this.studentGroupService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing student-group association' })
  @ApiResponse({
    status: 200,
    description: 'The student-group association has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Student-group association not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateStudentGroupDto: UpdateStudentGroupDto,
  ) {
    return this.studentGroupService.update(+id, updateStudentGroupDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student-group association' })
  @ApiResponse({
    status: 200,
    description: 'The student-group association has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Student-group association not found.',
  })
  remove(@Param('id') id: string) {
    return this.studentGroupService.remove(+id);
  }
}
