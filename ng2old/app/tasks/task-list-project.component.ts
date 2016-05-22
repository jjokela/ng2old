import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { OnActivate, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { Task, TaskState } from './task.model';
import { TaskService } from './task.service';
import { SortTasksPipe } from './sort-tasks.pipe';
import { Project } from '../projects/project.model';

@Component({
    selector: 'app-tasks-project',
    templateUrl: 'app/tasks/task-list-project.component.html',
    styleUrls: ['app/tasks/task-list-project.component.css'],
    directives: [
        ROUTER_DIRECTIVES
    ],
    pipes: [SortTasksPipe]
})

export class TaskListProjectComponent implements OnActivate, OnInit {
    tasks: Task[];
    @Input() project: Project;

    constructor(
        private taskService: TaskService,
        private router: Router
    ) { }

    routerOnActivate() {
        console.log(`routerOnActivate`);
    }

    ngOnInit() {
        console.log(`onInit`);
        this.getTasks();
    }

    addNew() {
        let link = ['/tasks', 'new', { projectId: this.project.id }];
        this.router.navigate(link);
    }

    getTasks() {
        this.tasks = [];

        this.taskService.getTasksByProject(this.project.id)
            .subscribe(
                (tasks: Task[]) => { this.tasks = tasks; },
                (error: any) => console.error('Error when getting Tasks: ' + error),
                () => console.log('got Tasks from service')
            );
    }

    gotoDetail(task: Task): void {
        let link = ['/tasks', task.id, { projectId: this.project.id }];
        this.router.navigate(link);
    }

    setTaskStateIcon(task: Task): string {
        let taskState = task.taskState;
        let icon = '';

        if (taskState == TaskState.Done) {
            icon = 'mood';
        } else if (taskState == TaskState.InProgress) {
            icon = 'schedule';
        } else if (taskState == TaskState.New) {
            icon = 'fiber_new';
        }
        return icon;
    }
}