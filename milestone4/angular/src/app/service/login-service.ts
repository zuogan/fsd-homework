import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    isLoggedIn = false;
    role;//0:Admin;1:User
    currentUser;
    // store the URL so we can redirect after logging in
    redirectUrl: string;
    constructor(private http: HttpClient, private authService: AuthService) { }

    login(username, password) : Observable<any>{
        const url = `${environment.getBaseUrl('auth')}/login`;
        console.log(url);
        console.log("username and password: ",username ,password);
        return this.http.post<any>(url, {
            'username': username,
            'password': password
        });
    }

    logout(): void {
        const url = `${environment.getBaseUrl('auth')}/logout`;
        this.http.get(url).subscribe((res)=>{
            console.log("logout response:", res)
        });
        this.clearLocalVariable();
    }

    clearLocalVariable() {
        this.isLoggedIn = false;
        this.role = '';
        this.currentUser = '';
        this.authService.revokeToken();
    }
}