import { Component, OnInit, Input, EventEmitter,Output, OnDestroy, ViewChild, ElementRef, AfterViewInit, AfterContentInit, ViewChildren, QueryList } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
// import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login-service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'ipo-edit',
  templateUrl: './ipo-edit.component.html',
  styleUrls: ['./ipo-edit.component.scss'],
})
export class IPOEditComponent implements OnInit,OnDestroy,AfterViewInit,AfterContentInit {

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

    stockexchanges=[
      {displayName:"NSE",value:"NSE"},
      {displayName:"BYX",value:"BYX"}
    ]
    burgerKing:HTMLElement;

    @Input() ipoData:any; // 
    @Input() userRole:any; // 
    @Output() goback: EventEmitter<any> = new EventEmitter();

    constructor(public elementRef: ElementRef,
        // public userService: UserService,
        public loginService: LoginService,
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
    
    Save(){            
  
    }

    exit(){
      this.goback.emit();
    }
}
