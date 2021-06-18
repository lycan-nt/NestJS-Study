import { Injectable, NotFoundException } from '@nestjs/common';
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
        const found = this.tasks.find((task) => { return task.id === id });

        if (!found)
        {
            throw new NotFoundException();
        }

        return found;
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
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter((task) => task.id !== found.id)
    }

    updateStatusById(id: string, status: TaskStatus)
    {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
