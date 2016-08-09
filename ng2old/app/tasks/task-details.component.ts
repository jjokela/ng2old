import { Component, Input, AfterViewChecked, OnInit, OnDestroy } from '@angular/core';
import { CanDeactivate, Router, ActivatedRoute } from '@angular/router';

import { EntityService, EnumKeysPipe, ModalService, ToastService } from '../shared/shared';

import { Task, TaskState, TaskStateConverter } from './task.model';
import { TaskService } from './task.service';
declare var componentHandler: any;

@Component({
    selector: 'app-task',
    templateUrl: 'app/tasks/task-details.component.html',
    styleUrls: ['app/tasks/task-details.component.css'],
    pipes: [EnumKeysPipe],
    providers: [TaskStateConverter]
})
export class TaskDetailsComponent implements AfterViewChecked, OnInit, OnDestroy {

    editTask: Task = <Task>{};
    projectId: number;
    private sub: any;

    @Input() task: Task;

    taskStates: any;

    constructor(
        private entityService: EntityService,
        private modalService: ModalService,
        private route: ActivatedRoute,
        private router: Router,
        private service: TaskService,
        private toastService: ToastService,
        private taskStateConverter: TaskStateConverter
    ) { }

    ngAfterViewChecked() {
        // viewChild is set after the view has been initialized
        componentHandler.upgradeAllRegistered();
    }

    convert(taskState: TaskState) {
        return this.taskStateConverter.getTaskDisplayValue(taskState);
    }

    //routerCanDeactivate(): any {
    //    return !this.task ||
    //        !this.isDirty() ||
    //        this.modalService.activate();
    //}

    ngOnInit() {

        this.taskStates = TaskState;

        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            this.projectId = +params['projectId'];

            console.log('projid: ' + this.projectId);
            if (this.isAddMode(id)) {
                this.task = <Task>{ name: '', description: '', projectId: this.projectId, taskState: TaskState.New };
                this.editTask = <Task>this.entityService.clone(this.task);
                return;
            }

            this.service.getTask(id)
                .subscribe((task: Task) => this.setEditTask(task));
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    cancel(showToast = true) {
        this.editTask = <Task>this.entityService.clone(this.task);
        if (showToast) {
            this.toastService.activate(`Cancelled changes to ${this.task.name}`);
        }
    }

    delete() {
        let msg = `Do you want to delete ${this.task.name}`;
        this.modalService.activate(msg).then(responseOk => {
            if (responseOk) {
                this.cancel(false);
                this.service.deleteTask(this.task)
                    .subscribe(() => {
                        this.toastService.activate(`Deleted ${this.task.name}`);
                        if (this.projectId) {
                            this.gotoProject();
                        } else {
                            this.gotoTasks();
                        }
                    });
            }
        });
    }

    isAddMode(id: any) {
        return isNaN(id);
    }

    private isDirty() {
        return this.entityService.propertiesDiffer(this.task, this.editTask);
    }

    private gotoProject() {
        let route = ['/projects', this.projectId];
        this.router.navigate(route);
    }

    private gotoTasks() {
        let route = ['/tasks'];
        this.router.navigate(route);
    }

    save() {
        let task: Task = this.task = this.entityService.merge(this.task, this.editTask);

        if (task.id == null) {
            this.service.addTask(task)
                .subscribe((task: Task) => {
                    this.setEditTask(task);
                    this.toastService.activate(`Successfully added ${task.name}`);
                    if (this.projectId) {
                        this.gotoProject();
                    } else {
                        this.gotoTasks();
                    }
                });
            return;
        }

        this.service.updateTask(task)
            .subscribe(() => this.toastService.activate(`Successfully saved ${task.name}`));
    }

    private setEditTask(task: Task) {
        if (task) {
            this.task = task;
            this.editTask = <Task>this.entityService.clone(this.task);
        }
    }
}


