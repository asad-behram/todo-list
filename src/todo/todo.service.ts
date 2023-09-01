import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TodoRepository } from './todo.repository';
import { ITask } from '../interface/task.interface';

@Injectable()
export class TodoService {
  constructor(@Inject(TodoRepository) private todoRepo: TodoRepository) {}

  // create new task
  public createTask = async (
    createTaskdto: CreateTaskDto,
  ): Promise<CreateTaskDto> => {
    const newTask: ITask = { ...createTaskdto };
    return await this.todoRepo.create(newTask);
  };

  // update task
  public updateTask = async (
    id: string,
    updateDto: UpdateTaskDto,
  ): Promise<UpdateTaskDto> => {
    const task: ITask = { ...updateDto };
    return await this.todoRepo.update(task, id);
  };

  // find all completed task
  async findCompletedItems(): Promise<ITask[]> {
    const CompletedItems = await this.todoRepo.findCompletedItems();
    if (!CompletedItems) {
      throw new NotFoundException('No completed task found');
    }
    return CompletedItems;
  }

  // get all tasks
  async getAllTasks(): Promise<ITask[]> {
    const taskData = await this.todoRepo.findAll();
    if (!taskData || taskData.length === 0) {
      throw new NotFoundException('Task not found');
    }
    return taskData;
  }
  // delete task
  async deleteTask(id: string): Promise<ITask> {
    const deletedTask = await this.todoRepo.delete(id);
    if (!deletedTask) {
      throw new NotFoundException('task not found');
    }
    return deletedTask;
  }

  // find task by id
  async findTask(id: string): Promise<ITask> {
    const found = await this.todoRepo.findOne(id);
    return found;
  }
}
