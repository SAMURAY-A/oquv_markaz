import { IsString, IsNotEmpty } from 'class-validator';

export class LogInStudentDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
