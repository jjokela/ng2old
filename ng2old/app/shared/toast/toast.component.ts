import { Component, OnInit } from '@angular/core';

import { ToastService } from './toast.service'

@Component({
  selector: 'toast',
  templateUrl: 'app/shared/toast/toast.component.html',
  styleUrls: ['app/shared/toast/toast.component.css']
})
export class ToastComponent implements OnInit {
  private defaults = {
    title: '',
    message: 'May the Force be with You'
  };
  title: string;
  message: string;

  private toastElement: any;

  constructor(toastService: ToastService) {
    toastService.activate = this.activate.bind(this);
  }

  activate(message = this.defaults.message, title = this.defaults.title) {
    this.title = title;
    this.message = message;
    this._show();
  }

  ngOnInit() {
    this.toastElement = document.getElementById('toast');
  }

  private _show() {
    console.log(this.message);
    this.toastElement.style.opacity = 1;
    this.toastElement.style.zIndex = 9999;

    window.setTimeout(() => this._hide(), 2500);
  }

  private _hide() {
    this.toastElement.style.opacity = 0;
    window.setTimeout(() => this.toastElement.style.zIndex = 0, 400);
  }
}
