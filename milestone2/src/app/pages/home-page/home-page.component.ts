import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, AfterContentInit, ViewChildren, QueryList } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit,OnDestroy,AfterViewInit,AfterContentInit {

    pushRightClass: string = 'push-right';
    _userRole:string;

    showAdminMenu: boolean;
    isOpenAction: boolean;
    isOpenAdminAction: boolean;
    isActive: boolean = false;
    currentPage: string;

    burgerKing:HTMLElement;

    constructor(
        public elementRef: ElementRef,
        public userService: UserService
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
}
