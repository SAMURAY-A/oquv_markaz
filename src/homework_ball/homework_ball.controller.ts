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
import { HomeworkBallService } from './homework_ball.service';
import { CreateHomeworkBallDto } from './dto/create-homework_ball.dto';
import { UpdateHomeworkBallDto } from './dto/update-homework_ball.dto';
import { Roles } from 'src/common/guard/role.decorator';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { Role, RolesGuard } from 'src/common/guard/role.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Homework_ball } from './homework_ball.model';

@ApiTags('homework-ball')
@Controller('homework-ball')
export class HomeworkBallController {
  constructor(private readonly homeworkBallService: HomeworkBallService) {}

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new homework ball entry' })
  @ApiResponse({
    status: 201,
    description: 'Homework ball created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createHomeworkBallDto: CreateHomeworkBallDto) {
    return this.homeworkBallService.create(createHomeworkBallDto);
  }

  @Roles(Role.TEACHER, Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Get all homework ball entries' })
  @ApiResponse({
    status: 200,
    description: 'List of all homework ball entries',
    type: [Homework_ball],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.homeworkBallService.findAll();
  }

  @Roles(Role.TEACHER, Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific homework ball entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'Homework ball entry found',
    type: Homework_ball,
  })
  @ApiResponse({ status: 404, description: 'Homework ball not found' })
  findOne(@Param('id') id: string) {
    return this.homeworkBallService.findOne(+id);
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a homework ball entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'Homework ball updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Homework ball not found' })
  update(
    @Param('id') id: string,
    @Body() updateHomeworkBallDto: UpdateHomeworkBallDto,
  ) {
    return this.homeworkBallService.update(+id, updateHomeworkBallDto);
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a homework ball entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'Homework ball deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Homework ball not found' })
  remove(@Param('id') id: string) {
    return this.homeworkBallService.remove(+id);
  }
}
