import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { TodoService } from './todo.service'; 
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { CreateTaskDto } from 'src/dto/create-task.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getItems(@Res() response) {
    try {
      const itemData = await this.todoService.getAllTasks();
      return response.status(HttpStatus.OK).json({
        message: 'Items found',
        itemData,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
  @Get('/search')
  async searchCompletedItems(@Res() response) {
    try {
      const completedItems = await this.todoService.findCompletedItems();
      return response.status(HttpStatus.OK).json({
        message: `Completed items found`,
        completedItems,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get('/:id/edit')
  async findTaskById(@Res() response, @Param('id') itemId: string) {
    try {
      const foundTask = await this.todoService.findTask(itemId);
      return response.status(HttpStatus.OK).json({
        message: 'task found',
        foundTask,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error',
        error: 'Bad Request',
      });
    }
  }

  @Post()
  async createTask(@Res() response, @Body() createTaskdto: CreateTaskDto) {
    try {
      const newTask = await this.todoService.createTask(createTaskdto);
      return response.status(HttpStatus.CREATED).json({
        messsage: 'task created',
        newTask,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateItem(
    @Res() response,
    @Param('id') itemId: string,
    @Body() updateItemdto: UpdateTaskDto,
  ) {
    try {
      const existingItem = await this.todoService.updateTask(
        itemId,
        updateItemdto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Item updated',
        existingItem,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error',
        error: 'Bad Request',
      });
    }
  }

  @Delete('/:id')
  async deleteItem(@Res() response, @Param('id') itemId: string) {
    try {
      const deletedItem = await this.todoService.deleteTask(itemId);
      return response.status(HttpStatus.OK).json({
        message: 'item has been deleted',
        deletedItem,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
