import { IsString, IsNotEmpty } from 'class-validator';

export class LogInStaffDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
