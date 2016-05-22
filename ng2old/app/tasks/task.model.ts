export enum TaskState {
    New = 1,
    InProgress = 2,
    Done = 3
}

export class TaskStateConverter {

    constructor() {
        this.getTaskDisplayValue = this.getTaskDisplayValue.bind(this);
    }

    getTaskDisplayValue(taskState: TaskState): string {

        var displayValue: string = '';
        if (taskState == TaskState.Done) {
            displayValue = 'Done';
        } else if (taskState == TaskState.InProgress) {
            displayValue = 'In Progress';
        } else if (taskState == TaskState.New) {
            displayValue = 'New';
        }
        return displayValue;
    }
}

export class Task {
    id: number;
    name: string;
    description: string;
    projectId: number;
    taskState: TaskState;
}