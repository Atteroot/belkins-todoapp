import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = this.taskModel.create(createTaskDto);
    return createdTask;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async delete(id: string): Promise<Task> {
    const deletedTask = await this.taskModel
      .findByIdAndDelete({ _id: id })
      .exec();

    return deletedTask;
  }

  async edit(id: string, task: { task: string }) {
    const editedTask = await this.taskModel
      .updateOne(
        { _id: id },
        {
          $set: {
            task: task.task,
          },
        },
      )
      .exec();
    console.log(editedTask);
    return editedTask;
  }

  async changeStatus(id: string) {
    const changedStatus = await this.taskModel.findByIdAndUpdate(id, [
      { $set: { completed: { $not: '$completed' } } },
    ]);

    return changedStatus;
  }
}
