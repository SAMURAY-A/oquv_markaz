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
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from 'src/common/guard/role.decorator';
import { Role, RolesGuard } from 'src/common/guard/role.guard';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({
    status: 201,
    description: 'The course has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Roles(Role.ADMIN, Role.STUDENT, Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Retrieve all courses' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all courses.',
  })
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Roles(Role.ADMIN, Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Retrieve a course by ID' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the course' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the course.',
  })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update a course by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the course to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The course has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete a course by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the course to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The course has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
