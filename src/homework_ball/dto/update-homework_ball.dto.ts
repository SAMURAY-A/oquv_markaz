import { PartialType } from '@nestjs/swagger';
import { CreateHomeworkBallDto } from './create-homework_ball.dto';

export class UpdateHomeworkBallDto extends PartialType(CreateHomeworkBallDto) {}
