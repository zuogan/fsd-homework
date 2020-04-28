import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, AfterContentInit, ViewChildren, QueryList } from '@angular/core';

import {MatSidenavModule} from '@angular/material/sidenav';
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

@Component({
  selector: 'side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit,OnDestroy,AfterViewInit,AfterContentInit {

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
        public elementRef: ElementRef
        ) { 
        // router.events.subscribe(val => {
        //     if (
        //         val instanceof NavigationEnd &&
        //         window.innerWidth <= 992 &&
        //         this.isToggled()
        //     ) {
        //         this.toggleSidebar();
        //     }
        // });
        
    }

    ngOnDestroy(): void {
        
    }

    ngAfterViewInit() {
        // this.list.changes.subscribe( newList =>
        //     {
                
        //         if(!this.burgerKing){
        //             this.burgerKing = document.querySelector('.bx--header__menu-trigger');
        //             this.burgerKing.addEventListener("click", () => {
        //                 console.log('click!');
        //                 this.isActive = !this.isActive;
        //                 if (this.isActive) {
        //                     document.addEventListener("click", this.outsideClick, true);
        //                 } else {
        //                     document.removeEventListener("click", this.outsideClick, true);  
        //                 }
        //             });
        //         }
        //     }
        //  )
    }
    ngAfterContentInit() {

    }
    ngOnInit() {     
        // this.router.events.pipe(
        //     filter(event => event instanceof NavigationEnd),
        //     tap(val =>{console.log(val instanceof NavigationEnd,val instanceof RoutesRecognized);
        //         window.innerWidth <= 992 && this.isToggled() ? this.toggleSidebar() : null;
        //     }),
        //     map(() => this.activatedRouter),
        //     map(route => {
        //         while (route.firstChild) route = route.firstChild;
        //         return route;
        //     }),
        //     filter(route => route.outlet === 'primary'),
        //     mergeMap(route => route.data)
        // ).subscribe((event)=>{  
        //     console.log("event=================",event);  
        //     if (event.name) {
        //         if(event.name.indexOf('admin')>-1){
        //             this.currentPage = 'admin';
        //         } else if(event.name.indexOf('dashboard')>-1){
        //             this.currentPage = 'dashboard';
        //         }else{
        //             this.currentPage = event.name;
        //         }
        //     } else {
        //         this.currentPage = 'home'
        //     }
        // });
  

        // this.appServices.getHome();

        // this.programs = [{
        //     name: 'pdcp',
        //     displayName: 'Power Deal Closer',
        //     shortName: 'pDC',
        //     order: 1
        // }];
    }

   
}
