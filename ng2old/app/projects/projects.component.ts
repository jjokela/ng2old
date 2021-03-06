﻿import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';
import { ProjectDetailsComponent } from './project-details.component';
import { ProjectListComponent } from './project-list.component';
import { ProjectService } from './project.service';
import { TaskService } from '../tasks/task.service';

import { FilterService} from '../shared/shared';

@Component({
    selector: 'app-projects-root',
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [FilterService, ProjectService, TaskService]
})
export class ProjectsComponent { }