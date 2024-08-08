import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todos.entity'; 

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  create(userId: number, text: string): Promise<Todo> {
    const todo = this.todoRepository.create({ userId, text });
    return this.todoRepository.save(todo);
  }

  findAll(userId: number): Promise<Todo[]> {
    return this.todoRepository.find({ where: { userId } });
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.todoRepository.delete({ id, userId });
  }
}