import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, 
          CanActivate, 
          CanLoad, 
          Route, 
          RouterStateSnapshot, 
          UrlSegment, 
          UrlTree, 
          Router } from '@angular/router';
import { Observable, tap, pipe } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService,
              private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const token = localStorage.getItem('token');

    if(token) {
      return true;
    }

    this.router.navigate(['./login']);

    return false;
    
  }

  canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {


    const token = localStorage.getItem('token');

    if(token) {
      return true;
    }

    this.router.navigate(['./login']);

    return false;
    
}

}