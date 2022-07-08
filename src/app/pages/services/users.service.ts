import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Response } from '../models/Response';
import { Person } from '../models/Person';
import { RegisterForm } from '../models/createForm';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = environment.baseUrl;

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): any  {
    return {
      'Authorization': `Bearer ${this.token}`
    };
  }

  constructor(private http: HttpClient) { }

  chargeUsers() {
    const url = `${this.baseUrl}people`;
    return this.http.get<Response>(url, { headers: this.headers } )
    .pipe(
      map( resp => {
          return resp.people;
      } )
    )
  }

  getUserId(id: string) {
    const url = `${this.baseUrl}people/${id}`;
    return this.http.get<Person>(url, {headers: this.headers})
    .pipe(
      map( resp => {
        return resp.person
      })
    )
  }

  createUser(formData: RegisterForm) {
    const url = `${this.baseUrl}people`;
    return this.http.post(url, formData, {headers: this.headers});
  }

  deleteUser(id: string){
    const url = `${this.baseUrl}people/${id}`;
    return this.http.delete(url, { headers: this.headers } );

  }

}
