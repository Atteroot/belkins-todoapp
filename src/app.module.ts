import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

import { TasksModule } from './tasks/tasks.module';

const login = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;

const uri = process.env.MONGODB_URI;

@Module({
  imports: [MongooseModule.forRoot(`${uri}`), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
