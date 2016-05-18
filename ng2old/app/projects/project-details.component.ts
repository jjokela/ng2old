import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CanDeactivate, OnActivate, Router, RouteSegment } from '@angular/router';

import { EntityService, ModalService, ToastService } from '../shared/shared';

import { Project } from './project.model';
import { ProjectService } from './project.service';
import { TaskListProjectComponent } from '../tasks/task-list-project.component';

@Component({
    selector: 'app-project',
    templateUrl: 'app/projects/project-details.component.html',
    styles: ['.mdl-textfield__label {top: 0;} textarea { font-family: Helvetica;}'],
    directives: [TaskListProjectComponent]
})
export class ProjectDetailsComponent implements OnActivate, CanDeactivate {

    editProject: Project = <Project>{};
    @Input() project: Project;

    constructor(
        private entityService: EntityService,
        private modalService: ModalService,
        private router: Router,
        private service: ProjectService,
        private toastService: ToastService
    ) { }

    routerCanDeactivate(): any {
        return !this.project ||
            !this.isDirty() ||
            this.modalService.activate();
    }

    routerOnActivate(curr: RouteSegment) {
        let id = +curr.getParam('id');

        if (this.isAddMode(id)) {
            this.project = <Project>{ name: '', description: '' };
            this.editProject = this.entityService.clone(this.project);
            return;
        }

        this.service.getProject(id)
            .subscribe((project: Project) => this.setEditProject(project));
    }

    cancel(showToast = true) {
        this.editProject = this.entityService.clone(this.project);
        if (showToast) {
            this.toastService.activate(`Cancelled changes to ${this.project.name}`);
        }
    }

    delete() {
        let msg = `Do you want to delete ${this.project.name}`;
        this.modalService.activate(msg).then(responseOk => {
            if (responseOk) {
                this.cancel(false);
                this.service.deleteProject(this.project)
                    .subscribe(() => {
                        this.toastService.activate(`Deleted ${this.project.name}`);
                        this.gotoProjects();
                    });
            }
        });
    }

    isAddMode(id: any) {
        return isNaN(id);
    }

    private isDirty() {
        return this.entityService.propertiesDiffer(this.project, this.editProject);
    }

    private gotoProjects() {
        let route = ['/projects'];
        this.router.navigate(route);
    }

    save() {
        let project: Project = this.project = this.entityService.merge(this.project, this.editProject);

        if (project.id == null) {
            this.service.addProject(project)
                .subscribe((project: Project) => {
                    this.setEditProject(project);
                    this.toastService.activate(`Successfully added ${project.name}`);
                    this.gotoProjects();
                });
            return;
        }

        this.service.updateProject(project)
            .subscribe(() => this.toastService.activate(`Successfully saved ${project.name}`));
    }

    private setEditProject(project: Project) {
        if (project) {
            this.project = project;
            this.editProject = this.entityService.clone(this.project);
        }
    }
}


