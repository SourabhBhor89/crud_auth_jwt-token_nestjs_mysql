import { Controller, Post, Get, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; 
import { AuthService } from '../auth/auth.service';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() body: { text: string }, @Req() req) {
    return this.todosService.create(req.user.id, body.text);
  }

  @Get()
  async findAll(@Req() req) {
    return this.todosService.findAll(req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req) {
    return this.todosService.remove(id, req.user.id);
  }
}