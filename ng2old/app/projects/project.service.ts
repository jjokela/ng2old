import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { ExceptionService, SpinnerService } from '../shared/shared';
import { Project } from './project.model';

@Injectable()
export class ProjectService {
    projectsUrl = 'api/projects.json';

    constructor(
        private exceptionService: ExceptionService,
        private http: Http,        
        private spinnerService: SpinnerService
    ) { }

    addProject(project: Project) {
        let body = JSON.stringify(project);        
        this.spinnerService.show('Saving...');
        return this.http
            .post(`${this.projectsUrl}`, body)
            .map(res => res.json().data)
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }

    deleteProject(project: Project) {        
        this.spinnerService.show('Deleting...');
        return this.http
            .delete(`${this.projectsUrl}/${project.id}`)
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }

    getProject(id: number) {
        return this.getProjects()
            .map((projects: Project[]) => projects.find((project: Project) => project.id == id))
            .do((data: any) => console.log('done getting Project with id: ' + id))
            .catch(this.exceptionService.catchBadResponse);
    }

    getProjects() {
        this.spinnerService.show();
        return this.http
            .get(`${this.projectsUrl}`)
            .map((response: Response) => <Project[]>response.json().data)
            .do((data: any) => console.log('done getting Projects, count ' + data.length))
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }

    updateProject(project: Project) {
        let body = JSON.stringify(project);
        this.spinnerService.show('Saving...');
        return this.http
            .put(`${this.projectsUrl}/${project.id}`, body)
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }
}
