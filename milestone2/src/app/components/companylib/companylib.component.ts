import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, AfterContentInit, ViewChildren, QueryList } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material';
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
export interface PeriodicElement {
  companyname: string;
  ceoname: string;
  turnover: number;
  description: string;
  ipodata: string;
  sector: string;
  stockchangename: string;
  code: string;
  action: string;
}

let ELEMENT_DATA: PeriodicElement[] =
[
  {companyname: "Name1", ceoname : 'Hydrogen', turnover: 10000, description: 'OEMs in outomotive industry',ipodata:"",sector:"automotive",stockchangename:"",  code:"12345", action:""},
  {companyname: "Name2", ceoname : 'kalen', turnover: 20000, description: 'it service',ipodata:"",sector:"Banking",stockchangename:"NSE",  code:"23456", action:""},
  {companyname: "Name3", ceoname : 'kalen', turnover: 20000, description: 'it service',ipodata:"",sector:"Banking",stockchangename:"NSE",  code:"23456", action:""},
  
  {companyname: "Name4", ceoname : 'kalen', turnover: 20000, description: 'it service',ipodata:"",sector:"Banking",stockchangename:"NSE",  code:"23456", action:""},
  
  {companyname: "Name5", ceoname : 'kalen', turnover: 20000, description: 'it service',ipodata:"",sector:"Banking",stockchangename:"NSE",  code:"23456", action:""},
  
  {companyname: "Name6", ceoname : 'kalen', turnover: 20000, description: 'it service',ipodata:"",sector:"Banking",stockchangename:"NSE",  code:"23456", action:""},
  
  {companyname: "Name7", ceoname : 'kalen', turnover: 20000, description: 'it service',ipodata:"",sector:"Banking",stockchangename:"NSE",  code:"23456", action:""},
  
  {companyname: "Name8", ceoname : 'kalen', turnover: 20000, description: 'it service',ipodata:"",sector:"Banking",stockchangename:"NSE",  code:"23456", action:""}
];


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
  selector: 'company-lib',
  templateUrl: './companylib.component.html',
  styleUrls: ['./companylib.component.scss'],
})
export class CompanylibComponent implements OnInit,OnDestroy,AfterViewInit,AfterContentInit {

    pushRightClass: string = 'push-right';
    userRole:string;
    showAdminMenu: boolean;
    isOpenAction: boolean;
    isOpenAdminAction: boolean;
    isActive: boolean = false;
    currentPage: string;
    showEditor: boolean=false;
    selectedEntry:any;
    constructor(
        public elementRef: ElementRef,
        public userService: UserService       
        ) { 
        this.userRole=this.userService.getuserRole();
        console.log("userRole",this.userRole)
    }

    ngOnDestroy(): void {
        
    }

    ngAfterViewInit() {
    }

    ngAfterContentInit() {
    }
  
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
  
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    showlib(){
      this.showEditor=false;
    }

    create(){
      this.showEditor=true;
      this.selectedEntry={companyname: "Name1", ceoname : '', turnover: 0, description: '',ipodata:"",sector:"",stockchangename:"",  code:"", action:""};
    }

    open(element){
      this.showEditor=true;
      this.selectedEntry=element;
    }
   
}
