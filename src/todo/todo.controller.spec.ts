import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { Todo } from 'src/schema/todo.schema';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  describe('create', () => {
    it('should create new task', async () => {
      const createTaskDto: CreateTaskDto = {
        task: 'new task',
        description: 'new description',
        completed: false,
      };
      const createdTask: Todo = {
        task: 'new task',
        description: 'new description',
        completed: false,
      };
      const res = {};

      service.create.mockResolvedValue(createdTask);
      const result = await controller.createTask(res, createTaskDto);
      expect(result).toBe(createdTask);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const todos: Todo[] = [
        {
          task: 'todo 1',
          description: 'todo 1 description',
          completed: false,
        },
        {
          task: 'todo 2',
          description: 'todo 2 description',
          completed: true,
        },
      ];
      const res = [];

      service.findAll.mockResolvedValue(todos);
      const result = await controller.getItems(res);
      expect(result).toBe(todos);
    });
  });
});
