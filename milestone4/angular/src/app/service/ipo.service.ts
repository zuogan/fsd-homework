
import { Injectable, Output } from '@angular/core';
import { Observable, Subscriber, Subscription, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IPOService {

  constructor(private http : HttpClient) { 
  }

  public listIPODetails(): Observable<any> {
    return this.http.get('/ipo/list');
  }
}
