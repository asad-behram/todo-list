import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  task: string;
  description: string;

  @IsBoolean()
  completed: boolean;
}
