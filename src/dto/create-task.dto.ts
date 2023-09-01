import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  task: string;

  @IsString()
  description: string;

  @IsBoolean()
  completed: boolean;
}
