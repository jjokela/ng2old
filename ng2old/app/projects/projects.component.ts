import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { ProjectDetailsComponent } from './project-details.component';
import { ProjectListComponent } from './project-list.component';
import { ProjectService } from './project.service';

@Component({
    selector: 'app-projects-root',
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
        { path: '/', component: ProjectListComponent },
        { path: '/:id', component: ProjectDetailsComponent }
])
export class ProjectsComponent { }