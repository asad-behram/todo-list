import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly task: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsBoolean()
  readonly completed: boolean;
}
