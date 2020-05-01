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
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit,OnDestroy,AfterViewInit,AfterContentInit {

    pushRightClass: string = 'push-right';
    _userRole:string;
    
    public programs;
    isValid: boolean=true;
    showAdminMenu: boolean;
    isOpenAction: boolean;
    isOpenAdminAction: boolean;
    isActive: boolean = false;
    currentPage: string;
    userName: string;
    passCode: string;
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
      ]);
    
    matcher = new MyErrorStateMatcher();

    // @ViewChildren("ibmheader") list:QueryList<ElementRef>;
    // burgerKing:HTMLElement;

    constructor(public elementRef: ElementRef,
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
      let checkuser=this.userService.login(this.userName,this.passCode);
      if(checkuser===true){
        this.isValid=true
        this.router.navigate(['/home']);          
        //redirect landing page
      }
      else{
        this.isValid=false
        //show user not valid
      }
    }

    signup(){
      this.router.navigate(['/signup']);  
    }
   
}
