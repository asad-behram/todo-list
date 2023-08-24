import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../schema/todo.schema';
import { CreateTaskDto } from '../dto/create-task.dto';

describe('TodoService', () => {
  let service: TodoService;
  let model: Model<Todo>;

  const mockTodoService = {
    findById: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    create: jest.fn(),
  };
  const task = {
    _id: '64dcbf2258f6d775b3e63ef8',
    task: 'new task',
    description: 'new description',
    completed: true,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken(Todo.name),
          useValue: mockTodoService,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    model = module.get<Model<Todo>>(getModelToken(Todo.name));
  });

  it('should create a new task', async () => {
    const createTask: CreateTaskDto = {
      task: 'new task',
      description: 'new description',
      completed: true,
    };
    const createdTask: CreateTaskDto = {
      task: 'new task',
      description: 'new description',
      completed: true,
    };
    model.create = jest.fn().mockResolvedValue(createTask);
    const result = await service.createTask(createTask);
    expect(result).toEqual(createdTask);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a task', async () => {
    jest.spyOn(model, 'findById').mockResolvedValue(task);
    const result = await service.findTask(task._id);
    expect(result).toEqual(task);
  });

  it('should find all tasks', async () => {
    const tasks = [
      {
        task: 'new task 1',
        description: 'new description 1',
        completed: true,
      },
      {
        task: 'new task 2',
        description: 'new description 2',
        completed: false,
      },
    ];
    jest.spyOn(model, 'find').mockResolvedValue(tasks);
    const result = await service.getAllTasks();
    expect(result).toEqual(tasks);
  });

  it('should update the task', async () => {
    const updatedTask = {
      task: 'updated task',
      description: 'updated description',
      completed: false,
    };
    jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedTask);
    const result = await service.updateTask(task._id, updatedTask);

    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      task._id,
      updatedTask,
      { new: true },
    );
    expect(result).toEqual(updatedTask);
  });

  describe('delete task', () => {
    it('should delet the task', async () => {
      const deletedTask = {
        task: 'updated task',
        description: 'updated description',
        completed: false,
      };
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(deletedTask);
      const result = await service.deleteTask(task._id);
      expect(result).toEqual(deletedTask);
    });

    it('should return error', async () => {
      const error = new Error('error');
      jest.spyOn(model, 'findByIdAndDelete').mockRejectedValue(error);
      await expect(service.deleteTask(task._id)).rejects.toThrow(error);
    });
  });
});
