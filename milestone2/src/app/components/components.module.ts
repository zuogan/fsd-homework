
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CompanylibComponent } from './companylib/companylib.component';
import { CompanyeditorComponent } from './companyeditor/companyeditor.component';

import { IpolibComponent } from './ipolib/ipolib.component';
import { IpoeditorComponent } from './Ipoeditor/Ipoeditor.component';
import { ImportComponent } from './import/import.component';
import { CommonModule } from '@angular/common';  
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatNativeDateModule} from '@angular/material';

@NgModule({
  imports: [ 
    MatSidenavModule ,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
    
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    CompanylibComponent,
    ImportComponent,
    CompanyeditorComponent,
    IpolibComponent,
    IpoeditorComponent  
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    CompanylibComponent,
    ImportComponent,
    CompanyeditorComponent,
    IpolibComponent,
    IpoeditorComponent       
  ],
  entryComponents: [
  
  ]
})
export class ComponentsModule { }
