import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { ITask } from 'src/interface/task.interface';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private taskModel: Model<ITask>) {}

  // create new task in mongo
  async createTask(createTaskdto: CreateTaskDto): Promise<ITask> {
    const newTask = new this.taskModel(createTaskdto);
    return await newTask.save();
  }

  async findCompletedItems(): Promise<ITask[]> {
    const CompletedItems = await this.taskModel.find({ completed: true });
    return CompletedItems;
  }

  // get all tasks
  async getAllTasks(): Promise<ITask[]> {
    const taskData = await this.taskModel.find();
    if (!taskData || taskData.length === 0) {
      throw new NotFoundException('Task not found');
    }
    return taskData;
  }
  // delete task
  async deleteTask(taskId: string): Promise<ITask> {
    const deletedTask = await this.taskModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      throw new NotFoundException('task not found');
    }
    return deletedTask;
  }

  async findTask(taskId: string): Promise<ITask> {
    return await this.taskModel.findById(taskId);
  }

  // update task
  async updateTask(
    taskId: string,
    updateTaskdto: UpdateTaskDto,
  ): Promise<ITask> {
    const existingTask = await this.taskModel.findByIdAndUpdate(
      taskId,
      updateTaskdto,
      { new: true },
    );
    if (!existingTask) {
      throw new NotFoundException('Task not found');
    }
    return existingTask;
  }
}
