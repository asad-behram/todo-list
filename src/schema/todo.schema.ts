import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ITask } from 'src/interface/task.interface';

@Schema({ timestamps: true })
export class Todo extends Document implements ITask {
  @Prop({ required: true, type: Types.ObjectId })
  _id: string;
  @Prop()
  task: string;
  @Prop()
  description: string;
  @Prop()
  completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
