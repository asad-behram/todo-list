import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAllTasks', () => {
    it('it should return an array', async () => {
      const rest = ['test'];
      jest.spyOn(service, 'getAllTasks').mockImplementation(async () => rest);
      expect(await service.getAllTasks()).toEqual(rest);
    });
  });
});
