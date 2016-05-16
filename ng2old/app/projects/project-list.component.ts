import { Component, OnInit, ViewChild } from '@angular/core';
import { OnActivate, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { FilterService, FilterTextComponent} from '../shared/shared';

import { Project } from './project.model';
import { ProjectService } from './project.service';
import { SortProjectsPipe } from './sort-projects.pipe';

@Component({
    selector: 'app-projects',
    templateUrl: 'app/projects/project-list.component.html',
    styleUrls: ['app/projects/project-list.component.css'],
    directives: [
        FilterTextComponent,
        ROUTER_DIRECTIVES
    ],
    pipes: [SortProjectsPipe],
    providers: [FilterService]
})

export class ProjectListComponent implements OnActivate {
    filteredProjects = this.projects;
    projects: Project[];

    @ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;

    constructor(
        private filterService: FilterService,
        private projectService: ProjectService,
        private router: Router
    ) { }

    routerOnActivate() {
        this.getProjects();
    }

    filterChanged(searchText: string) {
        this.filteredProjects = this.filterService.filter(searchText, ['name', 'description'], this.projects);
    }

    addNew() {
        let link = ['/projects', 'new'];
        this.router.navigate(link);
    }

    getProjects() {
        this.projects = [];
        this.projectService.getProjects()
            .subscribe(
            (projects: Project[]) => {
                this.projects = this.filteredProjects = projects;
                this.filterComponent.clear();
            },
            (error: any) => console.error('Error when getting Projects: ' + error),
            () => console.log('got Projects from service')
            );
    }

    gotoDetail(project: Project) {
        let link = ['/projects', project.id];
        this.router.navigate(link);
    }
}