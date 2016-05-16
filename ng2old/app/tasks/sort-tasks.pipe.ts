import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task.model';

@Pipe({ name: 'sortTasks' })
export class SortTasksPipe implements PipeTransform {
    transform(value: Task[], args: any[]) {
        if (!value || !value.sort) { return value; }

        return value.sort((a: Task, b: Task) => {
            return a.name.localeCompare(b.name);
        });
    }
}