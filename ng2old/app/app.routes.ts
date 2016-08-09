import { provideRouter, RouterConfig }  from '@angular/router';
import { ProjectsComponent } from './projects/projects';
import { projectsRoutes } from './projects/projects';
import { TasksComponent } from './tasks/tasks';
import { tasksRoutes } from './tasks/tasks';


//import { PageNotFoundComponent } from './not-found.component';

export const routes: RouterConfig = [
    ...tasksRoutes,
    ...projectsRoutes,
    { path: '', redirectTo: '/projects', pathMatch: 'full' },
    //{ path: 'projects', component: ProjectsComponent },
    { path: 'tasks', component: TasksComponent }
    //{ path: '*', component: ProjectsComponent }
    //{ path: '**', component: PageNotFoundComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];

