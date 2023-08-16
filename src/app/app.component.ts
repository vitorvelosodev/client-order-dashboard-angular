/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAddNewClientComponent } from './modal-add-new-client/modal-add-new-client.component';
// eslint-disable-next-line no-var
declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client-orders';

  formModal: any;

  @ViewChild(ModalAddNewClientComponent) childComponent!: ModalAddNewClientComponent;

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('newClientModal')
    );
  }

  openFormModal() {
    this.formModal.show();
  }

  closeAndConfirmFormModal() {
    this.formModal.hide();
    this.childComponent.sendClient();
  }
}
