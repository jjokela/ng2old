import { Component, OnDestroy } from '@angular/core';
import { SpinnerService } from './spinner.service'

@Component({
    selector: 'spinner-circle',
    styleUrls: ['app/shared/spinner/spinner.component.css'],
    templateUrl: 'app/shared/spinner/spinner.component.html'
})

export class SpinnerComponent implements OnDestroy {
    visible: boolean = true;
    message: string;
    private timeout: number;

    private defaults = {
        message: 'Loading...'
    };

    constructor(spinnerService: SpinnerService) {
        spinnerService.setRunningStatus = this.setRunningStatus.bind(this);
        spinnerService.show = this.show.bind(this);
        spinnerService.hide = this.hide.bind(this);
    }

    delay: number = 0;

    show(message = this.defaults.message): void {
        this.message = message;
        if (this.timeout) {
            return;
        }

        this.timeout = setTimeout(() => {
            this.visible = true;
            this.cancel();
        }, this.delay);
    }

    hide(): void {
        this.cancel();
        this.visible = false;
    }

    setRunningStatus(value: boolean): void {
        console.log('rairai');
        if (!value) {
            this.cancel();
            this.visible = false;
            console.log('ruirui');
            return;
        }

        if (this.timeout) {
            return;
        }

        this.timeout = setTimeout(() => {
            console.log('set timeout');
            this.visible = true;
            this.cancel();
        }, this.delay);
    }

    private cancel(): void {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    }

    ngOnDestroy(): any {
        this.cancel();
    }
}