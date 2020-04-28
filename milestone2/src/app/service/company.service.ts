
import { Injectable, Output } from '@angular/core';
import { Observable, Subscriber, Subscription, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedIn: boolean;
  public curUser:any;
  // private NODE_SERVICE: string
  private SERVER: string;
  constructor(private http : HttpClient) { 
    // this.SERVER = Constants.SERVER;
    
    this.loggedIn = false;
  
    return this;
  }

  // list all company information
  public list(): Promise<any>{
    return this.http.get('/company/list').toPromise();
  }

  public getcompanyByid(id): Promise<any> {
    this.loggedIn = false;
    this.curUser=null
    return this.http.get('/company/'+id).toPromise();
  }
 
  /**
   * Return User object
   *
   * @returns {object} user - user object from ldap
   */
  
}
