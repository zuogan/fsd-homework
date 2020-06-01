import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, AfterContentInit, ViewChildren, QueryList } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import {MatSort, MatTableDataSource, MatTable} from '@angular/material';
import {MatPaginator} from '@angular/material';
import { LoginService } from 'src/app/service/login-service';

export interface TableElement {
  id: number;
  companyname: string;
  stockchange: string;
  price: number;
  numberofshare: number;
  opendatetime: string;
  remarks: string;
  action:string;
}

@Component({
  selector: 'ipo-table',
  templateUrl: './ipo-table.component.html',
  styleUrls: ['./ipo-table.component.scss'],
})
export class IPOTableComponent implements OnInit,OnDestroy,AfterViewInit,AfterContentInit {

    mockTableData: TableElement[]  = [
      {id: 1, companyname: "BMW", stockchange : 'NSE', price: 33.22, numberofshare: 100000,opendatetime:"2019-12-12",remarks:"BMW", action:""},
      {id: 2, companyname: "Mercedez Benz", stockchange : 'BSE', price: 11.9, numberofshare: 2000000,opendatetime:"2019-11-11",remarks:"BENZ", action:""},
    ];

    pushRightClass: string = 'push-right';
    userRole:string;
    showAdminMenu: boolean;
    isOpenAction: boolean;
    isOpenAdminAction: boolean;
    isActive: boolean = false;
    currentPage: string;
    showEditor: boolean=false;
    selectedEntry:any;

    @ViewChild(MatTable) ipoTable: MatTable<any>;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['companyname', 'stockchange', 'price', 'numberofshare', 'opendatetime', 'remarks'];
    dataSource: any;

    constructor(public elementRef: ElementRef,
        // public userService: UserService
        public loginService: LoginService
        ) { 
    }

    ngOnInit() {
      this.userRole=this.loginService.role;
      console.log("userRole",this.userRole)
      if(this.userRole == "admin") {
        this.displayedColumns.push('action');
      }
      this.dataSource = new MatTableDataSource(this.mockTableData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

    ngOnDestroy(): void {
        
    }

    ngAfterViewInit() {
    }

    ngAfterContentInit() {
    }
  
    showlib(){
      this.showEditor=false;
    }

    create(){
      this.showEditor=true;
      this.selectedEntry= {companyname: "Name1", stockchange : 'NSE', price: 100, numberofshare: 1000000,opendatetime:0,remarks:"111"};
    }

    open(element){
      this.showEditor=true;
      this.selectedEntry=element;
    }
   
    remove(element){
      let index = -1;
      for (var i = 0; i < this.mockTableData.length; i++) {
        if (this.mockTableData[i].id == element.id) {
          index = i;
          break;
        }
      };
      if(index > -1) {
        this.mockTableData.splice(index, 1);
        this.ipoTable.renderRows();
      }
    }
}
