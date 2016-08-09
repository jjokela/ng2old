import { RouterConfig }         from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectDetailsComponent } from './project-details.component';
import { ProjectListComponent } from './project-list.component';

export const projectsRoutes: RouterConfig = [
    //{ path: 'projects', component: ProjectListComponent },
    //{ path: 'projects/:id', component: ProjectDetailsComponent }
    {
        path: 'projects',
        component: ProjectsComponent,
        children: [
            { path: ':id', component: ProjectDetailsComponent },
            { path: '', component: ProjectListComponent }
        ]
    }
];