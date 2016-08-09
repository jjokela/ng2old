import { Component } from '@angular/core';
import { TaskDetailsComponent } from './task-details.component';
import { TaskService } from './task.service';

@Component({
    selector: 'app-tasks-root',
    template: `
        <router-outlet></router-outlet>
    `,
    providers: [TaskService]
})
export class TasksComponent { }
