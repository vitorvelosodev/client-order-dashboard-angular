import { Component } from '@angular/core';
import { NewClientService } from '../core/new-client.service';

@Component({
  selector: 'app-modal-add-new-client',
  templateUrl: './modal-add-new-client.component.html',
  styleUrls: ['./modal-add-new-client.component.css']
})
export class ModalAddNewClientComponent {
  constructor (private newClientService: NewClientService) {}
  inputName = '';
  inputCity = '';
  inputTotalAmount = '';

  sendClient() {
    this.newClientService.updateClient(
      { city: this.inputCity,
        name: this.inputName,
        orderTotal: Number(this.inputTotalAmount),
        id: 0,
        customerSince: new Date() 
      }
    );
    this.inputName = this.inputCity = this.inputTotalAmount = '';
  }
}
