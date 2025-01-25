import { PartialType } from '@nestjs/swagger';
import { CreateHomeworkFileDto } from './create-homework_file.dto';

export class UpdateHomeworkFileDto extends PartialType(CreateHomeworkFileDto) {}
