import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from 'src/todo/todo.service';
import { Todo } from 'src/schema/todo.schema';

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

  it('should create a task', () => {
    const task: Todo = {
      task: 'new task',
      description: 'new description',
      completed: true,
    };
    expect(service.createTask(task)).toEqual(task);
  });

  it('should find all tasks', () => {
    const tasks: Todo[] = [
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
    tasks.forEach((task) => service.createTask(task));
    expect(service.getAllTasks()).toEqual(tasks);
  });

  it('should find task by ID', async () => {
    const task: Todo = {
      task: 'new task',
      description: 'new description',
      completed: false,
    };
    const createdTask = await service.createTask(task);
    expect(service.findTask(createdTask._id)).toEqual(task);
  });

  it('should update a task', async () => {
    const task: Todo = {
      task: 'new task',
      description: 'new description',
      completed: false,
    };
    const updatedTask: Todo = {
      task: 'updated task',
      description: 'updated description',
      completed: true,
    };
    const createdTask = await service.createTask(task);
    expect(service.updateTask(createdTask._id, updatedTask)).toEqual(
      updatedTask,
    );
  });

  it('should delete a task', async () => {
    const task: Todo = {
      task: 'updated task',
      description: 'updated description',
      completed: true,
    };
    const createdTask = await service.createTask(task);
    expect(service.deleteTask(createdTask._id)).toEqual(task);
    expect(service.findTask(createdTask._id)).toBeNull();
  });
});
