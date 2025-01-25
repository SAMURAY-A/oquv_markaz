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
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Roles } from 'src/common/guard/role.decorator';
import { Role, RolesGuard } from 'src/common/guard/role.guard';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Roles(Role.TEACHER, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new group' })
  @ApiResponse({
    status: 201,
    description: 'The group has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Roles(Role.TEACHER, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Retrieve all groups' })
  @ApiResponse({ status: 200, description: 'List of all groups' })
  findAll() {
    return this.groupService.findAll();
  }

  @Roles(Role.TEACHER, Role.ADMIN, Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific group by ID' })
  @ApiResponse({
    status: 200,
    description: 'Group data retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Group not found.' })
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Roles(Role.TEACHER, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific group by ID' })
  @ApiResponse({
    status: 200,
    description: 'Group has been updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Group not found.' })
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Roles(Role.TEACHER, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific group by ID' })
  @ApiResponse({
    status: 200,
    description: 'Group has been deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Group not found.' })
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
