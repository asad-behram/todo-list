import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { CreateTaskDto } from '../dto/create-task.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getItems() {
    try {
      const itemData = await this.todoService.getAllTasks();
      return itemData;
    } catch (error) {
      return error;
    }
  }
  @Get('/search')
  async searchCompletedItems() {
    try {
      const completedItems = await this.todoService.findCompletedItems();
      return completedItems;
    } catch (error) {
      return error;
    }
  }

  @Get('/:id/edit')
  async findTaskById(@Param('id') itemId: string) {
    try {
      const foundTask = await this.todoService.findTask(itemId);
      return foundTask;
    } catch (error) {
      return error;
    }
  }

  @Post()
  async createTask(@Body() createTaskdto: CreateTaskDto) {
    try {
      const newTask = await this.todoService.createTask(createTaskdto);
      return newTask;
    } catch (error) {
      return error;
    }
  }

  @Put('/:id')
  async updateItem(
    @Param('id') itemId: string,
    @Body() updateItemdto: UpdateTaskDto,
  ) {
    try {
      const existingItem = await this.todoService.updateTask(
        itemId,
        updateItemdto,
      );
      return existingItem;
    } catch (error) {
      return error;
    }
  }

  @Delete('/:id')
  async deleteItem(@Param('id') itemId: string) {
    try {
      const deletedItem = await this.todoService.deleteTask(itemId);
      return deletedItem;
    } catch (error) {
      return error;
    }
  }
}
