import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './schema/todo.schema';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';
import { TodoRepository } from './todo/todo.repository';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/todo-app', {
      dbName: 'todo-app',
    }),
    MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
    TodoModule,
  ],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService, TodoRepository],
})
export class AppModule {}
