import { RouterConfig }         from '@angular/router';
import { TaskDetailsComponent } from './task-details.component';

export const tasksRoutes: RouterConfig = [
    { path: 'tasks/:id', component: TaskDetailsComponent }
];
