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
import { StaffGroupService } from './staff_group.service';
import { CreateStaffGroupDto } from './dto/create-staff_group.dto';
import { UpdateStaffGroupDto } from './dto/update-staff_group.dto';
import { Roles } from 'src/common/guard/role.decorator';
import { Role, RolesGuard } from 'src/common/guard/role.guard';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Staff-Group Management')
@Controller('staff-group')
export class StaffGroupController {
  constructor(private readonly staffGroupService: StaffGroupService) {}

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new staff-group relationship' })
  @ApiResponse({
    status: 201,
    description: 'The staff-group relationship has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createStaffGroupDto: CreateStaffGroupDto) {
    return this.staffGroupService.create(createStaffGroupDto);
  }

  @Roles(Role.TEACHER, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Get all staff-group relationships' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all staff-group relationships.',
  })
  @ApiResponse({ status: 404, description: 'No records found' })
  findAll() {
    return this.staffGroupService.findAll();
  }

  @Roles(Role.TEACHER, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific staff-group relationship by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the staff-group relationship.',
  })
  @ApiResponse({
    status: 404,
    description: 'Staff-group relationship not found',
  })
  findOne(@Param('id') id: string) {
    return this.staffGroupService.findOne(+id);
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing staff-group relationship' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the staff-group relationship.',
  })
  @ApiResponse({ status: 400, description: 'Invalid ID or request data' })
  update(
    @Param('id') id: string,
    @Body() updateStaffGroupDto: UpdateStaffGroupDto,
  ) {
    return this.staffGroupService.update(+id, updateStaffGroupDto);
  }

  @Roles(Role.TEACHER, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a staff-group relationship' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the staff-group relationship.',
  })
  @ApiResponse({
    status: 404,
    description: 'Staff-group relationship not found',
  })
  remove(@Param('id') id: string) {
    return this.staffGroupService.remove(+id);
  }
}
