import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../schema/todo.schema';
import { ITask } from 'src/interface/task.interface';
import { TodoRepository } from './todo.repository';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
const moduleMocker = new ModuleMocker(global);

describe('TodoService', () => {
  let service: TodoService;
  let todoRepo: TodoRepository;

  const task: ITask = {
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
          useValue: Model,
        },
        TodoRepository,
      ],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetaData = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetaData);
          return new Mock();
        }
      })
      .compile();

    service = module.get<TodoService>(TodoService);
    todoRepo = module.get<TodoRepository>(TodoRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new task', async () => {
    const createTask: ITask = {
      task: 'new task',
      description: 'new description',
      completed: true,
    };
    jest
      .spyOn(todoRepo, 'create')
      .mockImplementation(async (): Promise<ITask> => {
        return createTask;
      });
    expect(await service.createTask(createTask)).toStrictEqual(createTask);
  });

  it('should find all tasks', async () => {
    const tasks: ITask[] = [
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
    jest
      .spyOn(todoRepo, 'findAll')
      .mockImplementation(async (): Promise<ITask[]> => {
        return tasks;
      });
    expect(await service.getAllTasks()).toStrictEqual(tasks);
  });

  it('should find a task', async () => {
    const foundTask: ITask = {
      _id: '64dcbf2258f6d775b3e63ef8',
      task: 'new task',
      description: 'new description',
      completed: true,
    };
    jest
      .spyOn(todoRepo, 'findOne')
      .mockImplementation(async (): Promise<ITask> => {
        return foundTask;
      });
    expect(await service.findTask(task._id)).toEqual(foundTask);
  });

  it('should update the task', async () => {
    const updatedTask: ITask = {
      task: 'updated task',
      description: 'updated description',
      completed: false,
    };
    jest
      .spyOn(todoRepo, 'update')
      .mockImplementation(async (): Promise<ITask> => {
        return updatedTask;
      });
    expect(await service.updateTask(task._id)).toStrictEqual(updatedTask);
  });

  describe('delete task', () => {
    it('should delet the task', async () => {
      jest
        .spyOn(todoRepo, 'delete')
        .mockImplementation(async (): Promise<ITask> => {
          return task;
        });
      expect(await service.deleteTask(task._id)).toBeNull();
    });

    it('should return error', async () => {
      const error = new Error('error');
      jest.spyOn(todoRepo, 'delete').mockRejectedValue(error);
      await expect(service.deleteTask(task._id)).rejects.toThrow(error);
    });
  });
});
