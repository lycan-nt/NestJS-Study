import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(
        private taskServices: TasksService,
    ) { }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length)
        {
            return this.taskServices.getTasksWithFilter(filterDto);
        }
        else
        {
            return this.taskServices.getAllTasks();
        }
            
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string)
    {
        return this.taskServices.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) : Task
    {
        return this.taskServices.createTasks(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) : string
    {
        this.taskServices.deleteTask(id);
        return 'Task deleted';
    }

    @Patch('/:id/status/')
    updateStatusById(@Param('id') id: string, @Body('status') status: TaskStatus) : Task
    {
        return this.taskServices.updateStatusById(id, status);
    }

}
