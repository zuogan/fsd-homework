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
  stockchange: string;
  price: number;
  numberofshare: number;
  opendatetime: string;
  remarks: string;
  action:string
}

let ELEMENT_DATA: PeriodicElement[] =
[
  {companyname: "Name1", stockchange : 'NSE', price: 100, numberofshare: 1000000,opendatetime:"2019-10-10",remarks:"111", action:""},
  {companyname: "Name2", stockchange : 'TCD', price: 95.20, numberofshare: 2000,opendatetime:"2019-10-10",remarks:"222", action:""},
  {companyname: "Name3", stockchange : 'NSE', price: 30.22, numberofshare: 40000,opendatetime:"2019-10-10",remarks:"333", action:""},
  {companyname: "Name4", stockchange : 'NSE', price: 40, numberofshare: 845555,opendatetime:"2019-10-10",remarks:"444", action:""},
  {companyname: "Name5", stockchange : 'NSE', price: 859.34, numberofshare: 78644,opendatetime:"2019-10-10",remarks:"555", action:""},
  
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
  selector: 'ipo-lib',
  templateUrl: './ipolib.component.html',
  styleUrls: ['./ipolib.component.scss'],
})
export class IpolibComponent implements OnInit,OnDestroy,AfterViewInit,AfterContentInit {

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
      this.selectedEntry= {companyname: "Name1", stockchange : 'NSE', price: 100, numberofshare: 1000000,opendatetime:0,remarks:"111", action:""};
    }

    open(element){
      this.showEditor=true;
      this.selectedEntry=element;
    }
   
}
