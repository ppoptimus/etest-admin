import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> {
  //   return this.authService.isLoggedIn         // {1}
  //     .pipe(
  //       take(1),                              // {2}
  //       map((isLoggedIn: boolean) => {         // {3}
  //         if (!isLoggedIn){
  //           this.router.navigate(['/login']);  // {4}
  //           return false;
  //         }
  //         return true;
  //       })
  //     );
  // }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.authService.isLoggedIn = true;
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
