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
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Roles } from 'src/common/guard/role.decorator';
import { Role, RolesGuard } from 'src/common/guard/role.guard';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Enrollments')
@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Roles(Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new enrollment' })
  @ApiResponse({
    status: 201,
    description: 'Enrollment successfully created.',
  })
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  @Roles(Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Get all enrollments' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all enrollments.',
  })
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Roles(Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get enrollment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the enrollment.',
  })
  @ApiResponse({
    status: 404,
    description: 'Enrollment not found.',
  })
  findOne(@Param('id') id: string) {
    return this.enrollmentService.findOne(+id);
  }

  @Roles(Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing enrollment' })
  @ApiResponse({
    status: 200,
    description: 'Enrollment successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentService.update(+id, updateEnrollmentDto);
  }

  @Roles(Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove an enrollment' })
  @ApiResponse({
    status: 200,
    description: 'Enrollment successfully removed.',
  })
  @ApiResponse({
    status: 404,
    description: 'Enrollment not found.',
  })
  remove(@Param('id') id: string) {
    return this.enrollmentService.remove(+id);
  }
}
