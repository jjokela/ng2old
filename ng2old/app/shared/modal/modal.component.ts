import { Component, OnInit } from '@angular/core';

import { ModalService } from './modal.service';

const KEY_ESC = 27;

@Component({
  selector: 'modal-confirm',
  templateUrl: 'app/shared/modal/modal.component.html',
  styleUrls: ['app/shared/modal/modal.component.css']
})
export class ModalComponent implements OnInit {
  private _defaults = {
    title: 'Confirmation',
    message: 'Do you want to cancel your changes?',
    cancelText: 'Cancel',
    okText: 'OK'
  };
  title: string;
  message: string;
  okText: string;
  cancelText: string;
  negativeOnClick: (e: any) => void;
  positiveOnClick: (e: any) => void;

  private modalElement: any;
  private cancelButton: any;
  private okButton: any;

  constructor(modalService: ModalService) {
    modalService.activate = this.activate.bind(this);
  }

  activate(message = this._defaults.message, title = this._defaults.title) {
    this.title = title;
    this.message = message;
    this.okText = this._defaults.okText;
    this.cancelText = this._defaults.cancelText;

    let promise = new Promise<boolean>((resolve, reject) => {
      this.negativeOnClick = (e: any) => resolve(false);
      this.positiveOnClick = (e: any) => resolve(true);
      this.show();
    });

    return promise;
  }

  ngOnInit() {
    this.modalElement = document.getElementById('confirmationModal');
    this.cancelButton = document.getElementById('cancelButton');
    this.okButton = document.getElementById('okButton');
  }

  private show() {
    document.onkeyup = null;

    if (!this.modalElement || !this.cancelButton || !this.okButton) return;

    this.modalElement.style.opacity = 0;
    this.modalElement.style.zIndex = 9999;

    this.cancelButton.onclick = ((e: any) => {
      e.preventDefault();
      if (!this.negativeOnClick(e)) this.hideDialog()
    });

    this.okButton.onclick = ((e: any) => {
      e.preventDefault();
      if (!this.positiveOnClick(e)) this.hideDialog()
    });

    this.modalElement.onclick = () => {
      this.hideDialog();
      return this.negativeOnClick(null);
    };

    document.onkeyup = (e: any) => {
      if (e.which == KEY_ESC) {
        this.hideDialog();
        return this.negativeOnClick(null);
      }
    };

    this.modalElement.style.opacity = 1;
  }

  private hideDialog() {
    document.onkeyup = null;
    this.modalElement.style.opacity = 0;
    window.setTimeout(() => this.modalElement.style.zIndex = -1, 400);
  }
}
