
import { Injectable, Output } from '@angular/core';
import { Observable, Subscriber, Subscription, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http : HttpClient) { 

  }

  public listCompanies(): Observable<any> {
    return this.http.get('/company/list');
  }

  public getCompanyByid(id): Observable<any> {
    return this.http.get('/company/'+id);
  }

}
