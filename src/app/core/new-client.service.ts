import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICustomer } from '../interfaces/ICustomers';

@Injectable({
  providedIn: 'root'
})
export class NewClientService {
  constructor() {}

  private _newClient = new BehaviorSubject<ICustomer>({ city: '', id: 0, customerSince: new Date(), name: '', orderTotal: 0 });
  public client$ = this._newClient.asObservable();

  updateClient(newClient: ICustomer) {
    this._newClient.next(newClient);
  }
}
