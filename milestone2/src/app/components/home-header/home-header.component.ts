import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, AfterContentInit, ViewChildren, QueryList } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent implements OnInit,OnDestroy,AfterViewInit,AfterContentInit {

    pushRightClass: string = 'push-right';
    _userRole:string;
    
    public programs;
    showAdminMenu: boolean;
    isOpenAction: boolean;
    isOpenAdminAction: boolean;
    isActive: boolean = false;
    currentPage: string;
    
   
    // private _ibmheader: Header;
    @ViewChildren("ibmheader") list:QueryList<ElementRef>;
    burgerKing:HTMLElement;
    //home:any[]=["/dashboard"];

    constructor(
        public elementRef: ElementRef,
        public userService: UserService,
        public router: Router        
        ){ 
        console.log("this.userService.loggedIn==============",this.userService.loggedIn)        
    }

    ngOnDestroy(): void {
        
    }

    ngAfterViewInit() {

    }
    ngAfterContentInit() {

    }
    ngOnInit() {     
    }

    logout(){
        this.userService.loggedIn=false;
        this.router.navigate(['/login']);    
    }
}
