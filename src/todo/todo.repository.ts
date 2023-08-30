import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ITask } from '../interface/task.interface';
import { Todo } from '../schema/todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel(Todo.name)
    private todomodel: Model<Todo>,
  ) {}

  async create(item: ITask): Promise<ITask> {
    return await this.todomodel.create(item);
  }

  async update(item: ITask, id: string): Promise<ITask> {
    return await this.todomodel.findByIdAndUpdate(id, item, { new: true });
  }

  async findOne(id: string): Promise<ITask> {
    return await this.todomodel.findOne({ _id: id });
  }

  async findCompletedItems(): Promise<ITask[]> {
    return await this.todomodel.find({ completed: true });
  }

  async findAll(): Promise<ITask[]> {
    return await this.todomodel.find();
  }

  async delete(id: string): Promise<ITask> {
    return await this.todomodel.findByIdAndDelete(id);
  }
}
