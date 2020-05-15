import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, AfterContentInit, ViewChildren, QueryList } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import {MatSort, MatTableDataSource, MatTable} from '@angular/material';
import {MatPaginator} from '@angular/material';
import { CompanyService } from 'src/app/service/company.service';
import * as _ from "lodash";

export interface TableElement {
  id: number;
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

@Component({
  selector: 'company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
})
export class CompanyTableComponent implements OnInit,OnDestroy,AfterViewInit,AfterContentInit {

    mockTableData: TableElement[] =
    [
      {id:1, companyname: "BMW", ceoname : 'John', turnover: 10000, description: '320Li, 520, 730L, X3, X5', ipodata:"",sector:"automotive",stockchangename:"BSE",  code:"BMW", action:""},
      {id:2, companyname: "Mercedez Benz", ceoname : 'Bill', turnover: 9009, description: 'C200, E300, S300, GLA, GLC GLS',ipodata:"",sector:"automotive",stockchangename:"NSE",  code:"BEN", action:""}
    ];
    tableData: TableElement[] = [];

    @ViewChild(MatTable) companyTable: MatTable<any>;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['companyname', 'ceoname', 'turnover', 'description','ipodata','sector','stockchangename','code'];
    dataSource: any;

    pushRightClass: string = 'push-right';
    userRole:string;
    showAdminMenu: boolean;
    isOpenAction: boolean;
    isOpenAdminAction: boolean;
    isActive: boolean = false;
    currentPage: string;
    showEditor: boolean=false;
    selectedEntry:any;
    constructor(public elementRef: ElementRef,
        private companyService: CompanyService,
        public userService: UserService  ) { 
    }

    ngOnDestroy(): void {
        
    }

    ngAfterViewInit() {
    }

    ngAfterContentInit() {
    }

    ngOnInit() {
      this.userRole=this.userService.getUserRole();
      console.log("userRole",this.userRole)
      if(this.userRole == "admin") {
        this.displayedColumns.push('action');
      }
      this.loadCompanyData();
      // this.dataSource = new MatTableDataSource(this.mockTableData);
      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

    private loadCompanyData() {
      this.companyService.listCompanies().subscribe((response: any) => {
        if(response.data && response.data.length > 0) {
          this.tableData = _.map(response.data, (item) => {
            return {
              id: item.id, 
              companyname: item.companyName, 
              ceoname : item.ceo, 
              turnover: item.turnover, 
              description: item.briefWriteUp, 
              ipodata: "",
              sector: item.sector.sectorName,
              stockchangename: item.stockExchange.stockExchange,  
              code: item.companyCode, 
              action: ""}
          });
          this.companyTable.renderRows();
        }
      });
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
        this.companyTable.renderRows();
      }
    }
}
