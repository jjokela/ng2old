import { Component, AfterViewChecked, OnInit, provide } from '@angular/core';
import { HTTP_PROVIDERS, XHRBackend } from '@angular/http';
import { Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { InMemoryBackendConfig, InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api/index';

import { EntityService, ExceptionService, ModalComponent, ModalService,
    SpinnerComponent, SpinnerService, ToastComponent, ToastService } from './shared/shared';

import { InMemoryProjectService } from '../api/in-memory-project.service';
import { ProjectsComponent } from './projects/projects';
import { TasksComponent } from './tasks/tasks';
declare var componentHandler: any;

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [
        ROUTER_DIRECTIVES,
        ModalComponent,
        ProjectsComponent,       
        ToastComponent,
        SpinnerComponent
    ],
    providers: [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        EntityService,
        ExceptionService,      
        ModalService,
        SpinnerService,
        ToastService,        
        provide(XHRBackend, { useClass: InMemoryBackendService }),
        provide(SEED_DATA, { useClass: InMemoryProjectService }),
        provide(InMemoryBackendConfig, { useValue: { delay: 600 } })
    ]
})
@Routes([
    { path: '/projects', component: ProjectsComponent },
    { path: '/tasks', component: TasksComponent },
    { path: '*', component: ProjectsComponent }
])
export class AppComponent implements AfterViewChecked, OnInit {
    constructor(private router: Router) { }

    ngAfterViewChecked() {
        // viewChild is set after the view has been initialized
        componentHandler.upgradeAllRegistered();
    }

    ngOnInit() {
        this.router.navigate(['/projects']);
    }
}
