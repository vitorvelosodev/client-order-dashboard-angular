import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FetchService } from '../core/fetch.service';
import { ICustomer } from '../interfaces/ICustomers';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css']
})
export class ClientTableComponent implements OnInit {
  private _customers : ICustomer[];
  filteredCustomers: ICustomer[];
  totalValue: number = 0;
  constructor (private fetchService: FetchService) {}
  
  ngOnInit(): void {
    this.fetchService.getCostumers().subscribe(
      (data: ICustomer[]) => {
        this._customers = data;
        this.filteredCustomers = data;
        this.calculateTotalValue();
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
    console.log(this.filteredCustomers);
    this.calculateTotalValue();
  }

  sortOrder: 'ASC' | 'DESC' | undefined;

  sort(parameter: 'name' | 'city' | 'orderTotal') {
    this.sortOrder === 'ASC' ? this.sortOrder = 'DESC' : this.sortOrder = 'ASC';
    if (!this.sortOrder) {
      this.sortOrder = 'ASC';
    }
    let order: number;
    this.sortOrder === 'ASC' ? order = 1 : order = -1; 
    this.filteredCustomers = this._customers.sort(
      (a, b) => order*(a[parameter].toString().localeCompare(b[parameter].toString()))
    );
  }
}
