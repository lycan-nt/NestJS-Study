import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v4 as uuid} from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks() : Task[]
    {
        return this.tasks;
    }

    getTasksWithFilter(filterDto: GetTasksFilterDto) : Task[]
    {
        const { status, search } = filterDto;

        let tasks = this.getAllTasks();

        if (status)
        {
            tasks = this.tasks.filter((task) => { return task.status === status });
        }

        if (search)
        {
            tasks = tasks.filter((task) => {
                if (task.title.includes(search) || task.description.includes(search))
                {
                    return true;
                }
                return false;
            })
        }

        return tasks;
    }

    getTaskById(id: string) : Task
    {
        return this.tasks.find((task) => { return task.id === id });
    }

    createTasks(createTaskDto: CreateTaskDto) : Task
    {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string)  : void
    {
        const index = this.tasks.findIndex((task) => { return task.id === id })
        this.tasks.splice(index, 1);
    }

    updateStatusById(id: string, status: TaskStatus)
    {
        const index = this.tasks.findIndex((task) => { return task.id == id });
        this.tasks[index].status = status;
        return this.tasks[index];
    }
}
