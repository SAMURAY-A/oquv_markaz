import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { HomeworkFilesService } from './homework_files.service';
import { CreateHomeworkFileDto } from './dto/create-homework_file.dto';
import { UpdateHomeworkFileDto } from './dto/update-homework_file.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/common/guard/role.decorator';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { Role, RolesGuard } from 'src/common/guard/role.guard';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10000);
    const ext = extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

@Controller('homework-files')
export class HomeworkFilesController {
  constructor(private readonly homeworkFilesService: HomeworkFilesService) {}

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  @ApiOperation({ summary: 'Upload a homework file' })
  @ApiResponse({
    status: 201,
    description: 'File successfully uploaded',
  })
  @ApiResponse({
    status: 400,
    description: 'No file uploaded',
  })
  @ApiBody({
    description: 'File to be uploaded along with homework details',
    type: CreateHomeworkFileDto,
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createHomeworkFileDto: CreateHomeworkFileDto,
  ) {
    if (!file) {
      throw new BadRequestException('Fayl yuklanmadi');
    }

    createHomeworkFileDto.file = file.filename;

    const savedFile = await this.homeworkFilesService.create(
      createHomeworkFileDto,
    );

    return savedFile;
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Get all homework files' })
  @ApiResponse({
    status: 200,
    description: 'List of all homework files',
  })
  findAll() {
    return this.homeworkFilesService.findAll();
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a single homework file by ID' })
  @ApiResponse({
    status: 200,
    description: 'Homework file details',
  })
  @ApiResponse({
    status: 404,
    description: 'File not found',
  })
  findOne(@Param('id') id: string) {
    return this.homeworkFilesService.findOne(+id);
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  @ApiOperation({ summary: 'Update a homework file' })
  @ApiResponse({
    status: 200,
    description: 'Homework file successfully updated',
  })
  @ApiResponse({
    status: 400,
    description: 'No file uploaded or invalid file',
  })
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateHomeworkFileDto: UpdateHomeworkFileDto,
  ) {
    if (file) {
      updateHomeworkFileDto.file = file.filename;
    }

    const updatedFile = await this.homeworkFilesService.update(
      +id,
      updateHomeworkFileDto,
    );
    return updatedFile;
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a homework file' })
  @ApiResponse({
    status: 200,
    description: 'File successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'File not found',
  })
  remove(@Param('id') id: string) {
    return this.homeworkFilesService.remove(+id);
  }
}
