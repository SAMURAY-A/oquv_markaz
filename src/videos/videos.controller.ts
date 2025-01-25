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
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/common/guard/role.decorator';
import { Role, RolesGuard } from 'src/common/guard/role.guard';
import { AuthGuard } from 'src/common/guard/auth.guard';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { Videos } from './videos.model';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10000);
    const ext = extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new video' })
  @ApiResponse({
    status: 201,
    description: 'The video has been successfully created.',
    type: Videos,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. File not uploaded.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Video file and metadata for creating a new video',
    type: CreateVideoDto,
  })
  @Post()
  @UseInterceptors(
    FileInterceptor('video', {
      storage,
    }),
  )
  async create(
    @UploadedFile() video: Express.Multer.File,
    @Body() createVideoDto: CreateVideoDto,
  ) {
    if (!video) {
      throw new BadRequestException('Fayl yuklanmadi');
    }

    createVideoDto.video = video.filename;

    const savedVideo = await this.videosService.create(createVideoDto);

    return savedVideo;
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all videos' })
  @ApiResponse({
    status: 200,
    description: 'List of all videos',
    type: [Videos],
  })
  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get video by ID' })
  @ApiResponse({ status: 200, description: 'The video', type: Videos })
  @ApiResponse({ status: 404, description: 'Video not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update a video by ID' })
  @ApiResponse({
    status: 200,
    description: 'The video has been successfully updated.',
    type: Videos,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. File not uploaded.' })
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('video', {
      storage,
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() video: Express.Multer.File,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    if (video) {
      updateVideoDto.video = video.filename;
    }

    const updatedVideo = await this.videosService.update(+id, updateVideoDto);

    return updatedVideo;
  }

  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete a video by ID' })
  @ApiResponse({
    status: 200,
    description: 'The video has been deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Video not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
