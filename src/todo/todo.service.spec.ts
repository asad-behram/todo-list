import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Todo } from '../schema/todo.schema';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';

describe('TodoService', () => {
  let service: TodoService;
  let repository: Repository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTodoDto: CreateTaskDto = {
        task: 'Test todo',
        description: 'test description',
        completed: false,
      };
      const createdTask: Todo = {
        task: 'Test Todo',
        description: 'test description',
        completed: false,
      };

      repository.create = jest.fn().mockReturnValue(createdTask);
      repository.save = jest.fn().mockRejectedValue(createdTask);

      const result = await service.createTask(createTodoDto);
      expect(result).toEqual(createdTask);
    });
  });
});
