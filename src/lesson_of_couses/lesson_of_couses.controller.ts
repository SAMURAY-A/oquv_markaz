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
import { LessonOfCousesService } from './lesson_of_couses.service';
import { CreateLessonOfCouseDto } from './dto/create-lesson_of_couse.dto';
import { UpdateLessonOfCouseDto } from './dto/update-lesson_of_couse.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { Role, RolesGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/guard/role.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Lesson of Courses') 
@Controller('lesson-of-couses')
export class LessonOfCousesController {
  constructor(private readonly lessonOfCousesService: LessonOfCousesService) {}

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new lesson of course' })
  @ApiBody({ type: CreateLessonOfCouseDto })
  @ApiResponse({
    status: 201,
    description: 'The lesson of course has been successfully created.',
  })
  create(@Body() createLessonOfCouseDto: CreateLessonOfCouseDto) {
    return this.lessonOfCousesService.create(createLessonOfCouseDto);
  }

  @Roles(Role.TEACHER, Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Get all lessons of courses' })
  @ApiResponse({ status: 200, description: 'Return all lessons of courses.' })
  findAll() {
    return this.lessonOfCousesService.findAll();
  }

  @Roles(Role.TEACHER, Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific lesson of course by ID' })
  @ApiParam({ name: 'id', description: 'Lesson of course ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The lesson of course has been successfully fetched.',
  })
  findOne(@Param('id') id: string) {
    return this.lessonOfCousesService.findOne(+id);
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a lesson of course by ID' })
  @ApiParam({ name: 'id', description: 'Lesson of course ID', type: Number })
  @ApiBody({ type: UpdateLessonOfCouseDto })
  @ApiResponse({
    status: 200,
    description: 'The lesson of course has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateLessonOfCouseDto: UpdateLessonOfCouseDto,
  ) {
    return this.lessonOfCousesService.update(+id, updateLessonOfCouseDto);
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lesson of course by ID' })
  @ApiParam({ name: 'id', description: 'Lesson of course ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The lesson of course has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.lessonOfCousesService.remove(+id);
  }
}
