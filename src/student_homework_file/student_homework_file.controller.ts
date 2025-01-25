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
import { StudentHomeworkFileService } from './student_homework_file.service';
import { CreateStudentHomeworkFileDto } from './dto/create-student_homework_file.dto';
import { UpdateStudentHomeworkFileDto } from './dto/update-student_homework_file.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/common/guard/role.decorator';
import { Role, RolesGuard } from 'src/common/guard/role.guard';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10000);
    const ext = extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

@ApiTags('Student Homework Files')
@ApiBearerAuth()
@Controller('student-homework-file')
export class StudentHomeworkFileController {
  constructor(
    private readonly studentHomeworkFileService: StudentHomeworkFileService,
  ) {}

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  @ApiOperation({ summary: 'Upload a homework file' })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createStudentHomeworkFileDto: CreateStudentHomeworkFileDto,
  ) {
    if (!file) {
      throw new BadRequestException('Fayl yuklanmadi');
    }

    createStudentHomeworkFileDto.file = file.filename;

    const savedFile = await this.studentHomeworkFileService.create(
      createStudentHomeworkFileDto,
    );

    return savedFile;
  }

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Get all student homework files' })
  findAll() {
    return this.studentHomeworkFileService.findAll();
  }

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a single student homework file by ID' })
  findOne(@Param('id') id: string) {
    return this.studentHomeworkFileService.findOne(+id);
  }

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  @ApiOperation({ summary: 'Update a student homework file' })
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateStudentHomeworkFileDto: UpdateStudentHomeworkFileDto,
  ) {
    if (file) {
      updateStudentHomeworkFileDto.file = file.filename;
    }

    const updatedFile = await this.studentHomeworkFileService.update(
      +id,
      updateStudentHomeworkFileDto,
    );
    return updatedFile;
  }

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student homework file' })
  remove(@Param('id') id: string) {
    return this.studentHomeworkFileService.remove(+id);
  }
}
