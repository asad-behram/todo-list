import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';

describe('TodoController', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [],
    }).compile();
    controller = module.get<TodoController>(TodoController);
  });
  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
