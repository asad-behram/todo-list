import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { async } from 'rxjs';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  describe('findAll', (){
    it('should return an array of tasks', async () => {
      const result = [];
      jest.spyOn(service, 'getAllTasks').mockImplementation(async () => result);
      expect(await controller.getItems()).toBe(result);
    });
  })
});

