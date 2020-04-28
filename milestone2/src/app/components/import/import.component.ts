import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, AfterContentInit, ViewChildren, QueryList } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

// const menuItem = [{
//     index: 1,
//     name: 'Dashboard',
//     path: '/dashboard'
//    }, {
//     index: 2,
//     name: 'Request',
//     path: '/home'
//    }, {
//     index: 3,
//     name: 'Report',
//     path: '/report'
//    }]
/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})



export class ImportComponent implements OnInit,OnDestroy,AfterViewInit,AfterContentInit {

    pushRightClass: string = 'push-right';
    _userRole:string;    
    public programs;
    isValid: boolean=true;
    showAdminMenu: boolean;
    isOpenAction: boolean;
    isOpenAdminAction: boolean;
    isActive: boolean = false;
    currentPage: string;
    filename: string;
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
      ]);
    
    matcher = new MyErrorStateMatcher();

    constructor(
        public elementRef: ElementRef,
        public userService: UserService,
        private router: Router
        ) { 
      
    }

    ngOnDestroy(): void {
        
    }

    ngAfterViewInit() {
    }
    
    ngAfterContentInit() {
    }

    ngOnInit() {     
    }
    
    submit(){
      // let checkuser=this.userService.login(this.userName,this.passCode);
      // if(checkuser===true){
      //   this.isValid=true
      //   this.router.navigate(['/home']);          
      //   //redirect landing page
      // }
      // else{
      //   this.isValid=false
      //   //show user not valid
      // }
    }

    cancel(){
      // this.userName="";
      // this.passCode="";
      this.isValid=true
    }

    signup(){
      this.router.navigate(['/signup']);  
    }
   
}
