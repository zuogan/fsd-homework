
import { Injectable, Output } from '@angular/core';
import { Observable, Subscriber, Subscription, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CompanyNew, CompanyUpdate } from '../model/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http : HttpClient) { 

  }

  public listCompanies(searchText?: string): Observable<any> {
    let paramsMap = {
      "searchText": searchText ? searchText : ""
    };
    return this.http.get('/zuul-company/api/company/list', { params: paramsMap });
  }

  public listCompaniesByPage(pageNum: number = 0, pageSize: number = 10, searchText?: string): Observable<any> {
    let paramsMap = {
      "page": pageNum + "",
      "size": pageSize + "",
      "sort": "id,desc",
      "searchText": searchText ? searchText : ""
    }
    return this.http.get('/zuul-company/api/company/page', { params: paramsMap });
  }

  public getCompanyByid(id): Observable<any> {
    return this.http.get('/zuul-company/api/company/'+id);
  }

  public createCompany(company: CompanyNew): Observable<any> {
    return this.http.post('/zuul-company/api/company/create', company);
  }

  public updateCompany(id, company: CompanyUpdate): Observable<any> {
    return this.http.post('/zuul-company/api/company/'+id+'/update', company);
  }

  public deleteCompanyByid(id): Observable<any> {
    return this.http.get('/zuul-company/api/company/'+id+'/delete');
  }
}
