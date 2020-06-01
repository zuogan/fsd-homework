
import { Injectable, Output } from '@angular/core';
import { Observable, Subscriber, Subscription, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CompanyNew, CompanyUpdate } from '../model/company.model';

@Injectable({
  providedIn: 'root'
})
export class StockExchangeService {

  constructor(private http : HttpClient) { 

  }

  public listAllStockExchange(): Observable<any> {
    return this.http.get('/zuul-stock-exchange/api/stockexchange/list');
  }
}
