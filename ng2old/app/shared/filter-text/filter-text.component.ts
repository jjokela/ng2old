import { Component, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';
declare var componentHandler: any;

@Component({
  selector: 'filter-text',
  templateUrl: 'app/shared/filter-text/filter-text.component.html'
})
export class FilterTextComponent implements AfterViewInit {
  @Output() changed: EventEmitter<string>;
  filter: string;

  constructor() {
      this.changed = new EventEmitter<string>();
  }

  clear() {
    this.filter = '';
  }

  filterChanged(event: any) {
    event.preventDefault();
    console.log(`Filter Changed: ${this.filter}`);
    this.changed.emit(this.filter);
  }

  ngAfterViewInit() {
      componentHandler.upgradeAllRegistered();
  }
}