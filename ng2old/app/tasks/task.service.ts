import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { ExceptionService, SpinnerService } from '../shared/shared';
import { Task } from './task.model';

@Injectable()
export class TaskService {
    tasksUrl = 'api/tasks.json';

    constructor(
        private exceptionService: ExceptionService,
        private http: Http,
        private spinnerService: SpinnerService
    ) { }

    addTask(task: Task) {
        let body = JSON.stringify(task);
        this.spinnerService.show('Saving...');
        return this.http
            .post(`${this.tasksUrl}`, body)
            .map(res => res.json().data)
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }

    deleteTask(task: Task) {
        this.spinnerService.show('Deleting...');
        return this.http
            .delete(`${this.tasksUrl}/${task.id}`)
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }

    getTask(id: number) {
        return this.getTasks()
            .map((tasks: Task[]) => tasks.find((task: Task) => task.id == id))
            .do((data: any) => console.log('done getting Task with id: ' + id))
            .catch(this.exceptionService.catchBadResponse);
    }

    getTasks() {
        this.spinnerService.show();
        return this.http
            .get(`${this.tasksUrl}`)
            .map((response: Response) => <Task[]>response.json().data)
            .do((data: any) => console.log('done getting Tasks, count ' + data.length))
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }

    getTasksByProject(id: number) {
        return this.getTasks()
            .map((tasks: Task[]) => tasks.filter((task: Task) => task.projectId == id))
            .do((data: any) => console.log('done getting Task with project id: ' + id + ' count: ' + data.length))
            .catch(this.exceptionService.catchBadResponse);
    }

    updateTask(task: Task) {
        let body = JSON.stringify(task);
        this.spinnerService.show('Saving...');
        return this.http
            .put(`${this.tasksUrl}/${task.id}`, body)
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }
}
