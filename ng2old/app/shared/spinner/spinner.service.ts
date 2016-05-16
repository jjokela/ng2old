import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {    
    setRunningStatus: (value: boolean) => void;
    show: (message?: string) => void;
    hide: () => void;
}
