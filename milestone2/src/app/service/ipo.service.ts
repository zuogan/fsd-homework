
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
  public userList=[
  {userName:"kalenadmin",password:"12345",roles:["admin"]},
  {userName:"kalenreader",password:"12345",roles:["reader"]}
  ]

  // private _userLoggedIn = this.$q.defer();
  // public userLoggedIn: Promise<any> = this._userLoggedIn.promise;
  public userLoggedIn: Promise<any>;

  constructor(private http : HttpClient) { 
    // this.SERVER = Constants.SERVER;
    
    this.loggedIn = false;
  
    return this;
  }

  // login
  public login(userName,passWord){

    for(let user in this.userList){
      if(this.userList[user].userName=== userName && this.userList[user].password=== passWord ){
        this.curUser=this.userList[user];
       
        this.loggedIn=true;
        return true
      }
    }    
    return false
  }

  // get current user roles

  public  inArray = function(arr, item) {
    for(var i = 0; i < arr.length; i++) {
           if(arr[i] == item) {
             return true;
           }
    }
    return false;
  };

  public getuserRole(){
    if(this.curUser && this.curUser.roles && this.curUser.roles.length>=1){

      if(this.inArray(this.curUser.roles,'admin')){
        return "admin"
      }
      if(this.inArray(this.curUser.roles,'reader')){
        return "reader"
      }
      return ""
    }
  }

    /**
   * Logout current user out.
   * Then send user to login screen
   *
   * @return {object} route - send user to url that will log the
   * user out of the app
   */
  public logout(): Promise<any> {
    this.loggedIn = false;
    this.curUser=null

    // this.$state.go('cf.Login');
    return this.http.get('/logout').toPromise();
  }

  /**
   * Upon starting the app check if user is already logged in.
   */


  
  
  /**
   * Return User object
   *
   * @returns {object} user - user object from ldap
   */
  
}
