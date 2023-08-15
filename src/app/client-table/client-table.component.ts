import { Component, OnInit, Input } from '@angular/core';

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

  filterCustomer(filter: string) {
    console.log(typeof filter);
    if (filter) {
      this.filteredCustomers = this._customers.filter(customer => {
        return customer.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
               customer.city.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
               customer.orderTotal.toString().indexOf(filter) > -1;
      });
    } else {
      this.filteredCustomers = this._customers;
    }
    console.log(this.filteredCustomers);
    this.calculateTotalValue();
  }
}
