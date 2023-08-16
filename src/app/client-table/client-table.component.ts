import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FetchService } from '../core/fetch.service';
import { ICustomer } from '../interfaces/ICustomers';
import { NewClientService } from '../core/new-client.service';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css']
})
export class ClientTableComponent implements OnInit {
  private _customers : ICustomer[];
  filteredCustomers: ICustomer[];
  totalValue: number = 0;
  receivedClientFromService = { city: '', id: 0, customerSince: new Date(), name: '', orderTotal: 0 };
  constructor (private fetchService: FetchService, private newClientService: NewClientService) {}
  
  ngOnInit(): void {
    this.fetchService.getCostumers().subscribe(
      (data: ICustomer[]) => {
        this._customers = data;
        this.filteredCustomers = data;
        this.calculateTotalValue();
      });
    
    this.newClientService.client$.subscribe((client) => {
      if (this.receivedClientFromService !== client && this._customers) {
        this.receivedClientFromService = client;
        this._customers.push(this.receivedClientFromService);
        this.filteredCustomers = this._customers;
        this.calculateTotalValue();
      }
    });
  }
  
  private calculateTotalValue() {
    this.totalValue = 0;
    this.filteredCustomers.forEach((customer) => this.totalValue += customer.orderTotal);
  }

  @Input() get customers() {
    return this._customers;
  }

  set customers(value: ICustomer[]) {
    if (value) {
      this.filteredCustomers = this._customers = value;
      this.calculateTotalValue();
    }
  }

  private _filter: string;
  @Input() get filter() {
    return this._filter;
  }

  set filter(value: string) {
    this._filter = value;
    this.input.emit(this.filter);
  }

  @Output() input: EventEmitter<string> = new EventEmitter<string>();

  filterCustomer(filter: Event) {
    const { value } = filter.target as HTMLInputElement;
    if (filter) {
      this.filteredCustomers = this._customers.filter(customer => {
        return customer.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
               customer.city.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
               customer.orderTotal.toString().indexOf(value) > -1;
      });
    } else {
      this.filteredCustomers = this._customers;
    }
    this.calculateTotalValue();
  }

  sortOrder: 'ASC' | 'DESC' | undefined;
  sortedBy: 'name' | 'city' | 'orderTotal' | undefined = undefined;

  sort(parameter: 'name' | 'city' | 'orderTotal') {
    if (this.sortOrder === 'ASC' && parameter === this.sortedBy) { 
      this.sortOrder = 'DESC';
    } else {
      this.sortOrder = 'ASC';
      this.sortedBy = parameter;
    }

    let order: number;
    this.sortOrder === 'ASC' ? order = 1 : order = -1;
    if (parameter !== 'orderTotal') {
      this.filteredCustomers = this._customers.sort(
        (a, b) => order*(a[parameter].toString().localeCompare(b[parameter].toString()))
      );
    } else {
      this.filteredCustomers = this._customers.sort(
        (a, b) => order*(a.orderTotal - b.orderTotal)
      );
    }
  }


}
