import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, AfterContentInit, ViewChildren, QueryList } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'user-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit,OnDestroy,AfterViewInit,AfterContentInit {

    pushRightClass: string = 'push-right';
    _userRole:string;

    isValid: boolean=true;
    showAdminMenu: boolean;
    isOpenAction: boolean;
    isOpenAdminAction: boolean;
    isActive: boolean = false;
    currentPage: string;
    userName: string;
    passCode: string;
    confirmpassCode: string;
    email: string;
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
      ]);
    
    matcher = new MyErrorStateMatcher();

    burgerKing:HTMLElement;

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
        this.router.navigate(['/login']);          
    }

    cancel(){
      this.userName="";
      this.passCode="";
      this.confirmpassCode="";
      this.email="";
    }
   
}
