import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly task: string;

  @IsBoolean()
  readonly completed: boolean;
}
