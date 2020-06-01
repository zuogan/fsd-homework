import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// import { OAuthService } from 'angular-oauth2-oidc';
// import { Auth2Service } from '../service/auth-service-old';
import { LoginService } from '../service/login-service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        // private oauthService: OAuthService, 
        // private authService: Auth2Service,
        private loginService: LoginService,
        private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
        console.log("****** AuthGuard.canActivate run");
        if(!this.loginService.isLoggedIn) {
            console.log("****** AuthGuard.canActivate, current not login, redirect to login");
            this.router.navigate(['/login']);
            return false;
        }
        console.log("****** AuthGuard.canActivate, current is login, allow to enter component");
        return true;
        // return this.authService.identityValid();
        // if (this.oauthService.hasValidAccessToken()) { //hasValidIdToken
        //     console.log("****** AuthGuard.canActivate, oauthService.hasValidAccessToken() == true");
        //     return true;
        // }
        // console.log("****** AuthGuard.canActivate, oauthService.hasValidAccessToken() == false");
        // this.router.navigate(['/']);
        // return false;
    }
}