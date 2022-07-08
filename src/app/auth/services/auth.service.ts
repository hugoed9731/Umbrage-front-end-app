import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl: string = environment.baseUrl;
  private _user!: AuthResponse;

  get user() {
    return {...this._user};
    // this prevents me from modifying the user somewhere
  }

  constructor(private http: HttpClient) { 
  }

  


  login(username: string, password: string) {

    const url = `${this.baseUrl}login`;
    const body = {username, password};
    
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if(resp) {
            localStorage.setItem('token', resp.access_token!);
            console.log(resp);
          }
        }),
        map(resp => resp),
        catchError(err => of(err.error.msg))
      )
  }

}
