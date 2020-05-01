import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
const routes: Routes = [

  { path: 'header', component: HomeHeaderComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
