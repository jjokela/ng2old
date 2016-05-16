import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './project.model';

@Pipe({ name: 'sortProjects' })
export class SortProjectsPipe implements PipeTransform {
    transform(value: Project[], args: any[]) {
        if (!value || !value.sort) { return value; }

        return value.sort((a: Project, b: Project) => {
            return a.name.localeCompare(b.name);
        });
    }
}