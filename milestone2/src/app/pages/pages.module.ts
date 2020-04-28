
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { ComponentsModule } from '../components/components.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  imports: [ 
    MatSidenavModule,
    MatTabsModule,
    ComponentsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    HttpClientModule
  ],
  declarations: [ 
    MainpageComponent,
    LoginComponent,
    SignupComponent
  ],
  exports: [
    MainpageComponent,
    LoginComponent,
    SignupComponent  
  ],
  entryComponents: [
  
  ]
})
export class PagesModule { }
