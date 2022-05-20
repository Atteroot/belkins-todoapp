import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './schemas/task.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAll(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }

  @Put(':id')
  async edit(@Param('id') id: string, @Body() editedTask: { task: string }) {
    return this.tasksService.edit(id, editedTask);
  }

  @Patch('/status/:id')
  async changeStatus(@Param('id') id: string) {
    return this.tasksService.changeStatus(id);
  }
}
