import { Component, Input, OnInit } from '@angular/core';
import { CanDeactivate, OnActivate, Router, RouteSegment } from '@angular/router';

import { EntityService, ModalService, ToastService } from '../shared/shared';

import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
    selector: 'app-task',
    templateUrl: 'app/tasks/task-details.component.html',
    styles: ['.mdl-textfield__label {top: 0;} textarea { font-family: Helvetica;}']
})
export class TaskDetailsComponent implements OnActivate, CanDeactivate {

    editTask: Task = <Task>{};
    @Input() task: Task;

    constructor(
        private entityService: EntityService,
        private modalService: ModalService,
        private router: Router,
        private service: TaskService,
        private toastService: ToastService
    ) { }

    routerCanDeactivate(): any {
        return !this.task ||
            !this.isDirty() ||
            this.modalService.activate();
    }

    routerOnActivate(curr: RouteSegment) {
        let id = +curr.getParam('id');

        if (this.isAddMode(id)) {
            this.task = <Task>{ name: '', description: '' };
            this.editTask = this.entityService.clone(this.task);
            return;
        }

        this.service.getTask(id)
            .subscribe((task: Task) => this.setEditTask(task));
    }

    cancel(showToast = true) {
        this.editTask = this.entityService.clone(this.task);
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
                        this.gotoTasks();
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
                    this.gotoTasks();
                });
            return;
        }

        this.service.updateTask(task)
            .subscribe(() => this.toastService.activate(`Successfully saved ${task.name}`));
    }

    private setEditTask(task: Task) {
        if (task) {
            this.task = task;
            this.editTask = this.entityService.clone(this.task);
        }
    }
}


