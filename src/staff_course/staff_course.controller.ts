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
import { StaffCourseService } from './staff_course.service';
import { CreateStaffCourseDto } from './dto/create-staff_course.dto';
import { UpdateStaffCourseDto } from './dto/update-staff_course.dto';
import { Roles } from 'src/common/guard/role.decorator';
import { Role, RolesGuard } from 'src/common/guard/role.guard';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Staff-Course Management')
@Controller('staff-course')
export class StaffCourseController {
  constructor(private readonly staffCourseService: StaffCourseService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new staff-course record' })
  @ApiResponse({
    status: 201,
    description: 'The staff-course record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createStaffCourseDto: CreateStaffCourseDto) {
    return this.staffCourseService.create(createStaffCourseDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Get all staff-course records' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all staff-course records.',
  })
  @ApiResponse({ status: 404, description: 'No records found' })
  findAll() {
    return this.staffCourseService.findAll();
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific staff-course record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the staff-course record.',
  })
  @ApiResponse({ status: 404, description: 'Staff-course record not found' })
  findOne(@Param('id') id: string) {
    return this.staffCourseService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing staff-course record' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the staff-course record.',
  })
  @ApiResponse({ status: 400, description: 'Invalid ID or request data' })
  update(
    @Param('id') id: string,
    @Body() updateStaffCourseDto: UpdateStaffCourseDto,
  ) {
    return this.staffCourseService.update(+id, updateStaffCourseDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a staff-course record' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the staff-course record.',
  })
  @ApiResponse({ status: 404, description: 'Staff-course record not found' })
  remove(@Param('id') id: string) {
    return this.staffCourseService.remove(+id);
  }
}
