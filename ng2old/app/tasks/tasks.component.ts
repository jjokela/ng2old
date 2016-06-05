import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { TaskDetailsComponent } from './task-details.component';
import { TaskListComponent } from './task-list.component';
import { TaskService } from './task.service';

@Component({
    selector: 'app-tasks-root',
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [TaskService]
})
@Routes([
    { path: '/', component: TaskListComponent },
    { path: '/:id', component: TaskDetailsComponent }
])
export class TasksComponent { }