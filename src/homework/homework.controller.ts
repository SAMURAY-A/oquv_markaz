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
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { Roles } from 'src/common/guard/role.decorator';
import { Role, RolesGuard } from 'src/common/guard/role.guard';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Homework } from './homework.model'; 

@ApiTags('homework')
@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new homework entry' })
  @ApiResponse({ status: 201, description: 'Homework created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createHomeworkDto: CreateHomeworkDto) {
    return this.homeworkService.create(createHomeworkDto);
  }

  @Roles(Role.TEACHER, Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Get all homework entries' })
  @ApiResponse({
    status: 200,
    description: 'List of all homework entries',
    type: [Homework],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.homeworkService.findAll();
  }

  @Roles(Role.TEACHER, Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific homework entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'Homework entry found',
    type: Homework,
  })
  @ApiResponse({ status: 404, description: 'Homework not found' })
  findOne(@Param('id') id: string) {
    return this.homeworkService.findOne(+id);
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a homework entry by ID' })
  @ApiResponse({ status: 200, description: 'Homework updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Homework not found' })
  update(
    @Param('id') id: string,
    @Body() updateHomeworkDto: UpdateHomeworkDto,
  ) {
    return this.homeworkService.update(+id, updateHomeworkDto);
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a homework entry by ID' })
  @ApiResponse({ status: 200, description: 'Homework deleted successfully' })
  @ApiResponse({ status: 404, description: 'Homework not found' })
  remove(@Param('id') id: string) {
    return this.homeworkService.remove(+id);
  }
}
