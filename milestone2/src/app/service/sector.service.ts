
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http : HttpClient) { 

  }

  public listAll(): Observable<any> {
    return this.http.get('/zuul-sector/api/sector/list');
  }
}
