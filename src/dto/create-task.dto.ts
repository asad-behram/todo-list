import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsString()
  task: string;

  @IsString()
  description: string;

  @IsBoolean()
  completed: boolean;
}
