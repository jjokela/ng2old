import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { OnActivate, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { FilterService, FilterTextComponent} from '../shared/shared';

import { Task } from './task.model';
import { TaskService } from './task.service';
import { SortTasksPipe } from './sort-tasks.pipe';
import { Project } from '../projects/project.model';

@Component({
    selector: 'app-tasks',
    templateUrl: 'app/tasks/task-list.component.html',
    styleUrls: ['app/tasks/task-list.component.css'],
    directives: [
        FilterTextComponent,
        ROUTER_DIRECTIVES
    ],
    pipes: [SortTasksPipe],
    providers: [FilterService]
})

export class TaskListComponent implements OnActivate, OnInit {
    tasks: Task[];
    filteredTasks = this.tasks;

    @Input() project: Project;
    @ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;

    constructor(
        private filterService: FilterService,
        private taskService: TaskService,
        private router: Router
    ) { }

    routerOnActivate() {
        console.log(`routerOnActivate`);
    }

    ngOnInit() {
        console.log(`onInit`);
        this.getTasks();
    }

    filterChanged(searchText: string) {
        this.filteredTasks = this.filterService.filter(searchText, ['name', 'description'], this.tasks);
    }

    addNew() {
        let link = ['/tasks', 'new'];
        this.router.navigate(link);
    }

    getTasks() {
        this.tasks = [];
        this.taskService.getTasks()
            .subscribe(
            (tasks: Task[]) => {
                this.tasks = this.filteredTasks = tasks;
                this.filterComponent.clear();
            },
            (error: any) => console.error('Error when getting Tasks: ' + error),
            () => console.log('got Tasks from service')
            );
    }

    gotoDetail(task: Task) {
        let link = ['/tasks', task.id];
        this.router.navigate(link);
    }
}