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
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Roles } from 'src/common/guard/role.decorator';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { Role, RolesGuard } from 'src/common/guard/role.guard';
import { LogInStaffDto } from './dto/login-staff.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Staff')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @ApiOperation({ summary: 'Register a new staff member' })
  @ApiResponse({
    status: 201,
    description: 'Staff member successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('register')
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Post('default-admin')
  defaultAdmin() {
    return this.staffService.createDefaultAdmin();
  }

  @ApiOperation({ summary: 'Staff member login' })
  @ApiResponse({
    status: 200,
    description: 'Staff member logged in successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('login')
  login(@Body() loginStaffDto: LogInStaffDto) {
    return this.staffService.login(loginStaffDto);
  }

  @ApiOperation({ summary: 'Find all staff members' })
  @ApiResponse({ status: 200, description: 'List of all staff members.' })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @ApiOperation({ summary: 'Some false endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Just a placeholder for an admin action.',
  })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('see')
  false_see() {
    return this.staffService.false_see();
  }

  @ApiOperation({ summary: 'Get staff member by ID' })
  @ApiResponse({ status: 200, description: 'Staff member found.' })
  @ApiResponse({ status: 404, description: 'Staff member not found.' })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(id);
  }

  @ApiOperation({ summary: 'Update staff member by ID' })
  @ApiResponse({
    status: 200,
    description: 'Staff member successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(id, updateStaffDto);
  }

  @ApiOperation({ summary: 'Delete staff member by ID' })
  @ApiResponse({
    status: 200,
    description: 'Staff member successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Staff member not found.' })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(id);
  }

  @ApiOperation({ summary: 'Confirm user action for a specific staff member' })
  @ApiResponse({ status: 200, description: 'Action confirmed successfully.' })
  @ApiResponse({ status: 404, description: 'Staff member not found.' })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('users_confirmation/:id')
  async users_confirmation(@Param('id') id: string) {
    return await this.staffService.users_confirmation(id);
  }
}
