import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class TokenIntercepterInterceptor implements HttpInterceptor {

  constructor(
    private authenSV: AuthService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const customReq = request.clone({
      setHeaders:{
          Authorization: this.authenSV.getAuthorizationHeaderValue()
      }
  });
    return next.handle(customReq).pipe(
      catchError(err => {
          if (err.status == 401) {
            this.authenSV.logout()
            this.error('โทเคนหมดอายุกรุณา Login ใหม่')
            this.router.navigate(['./login'],{ replaceUrl: true })
          }
          return throwError(err);
      })
    );
  }

  error(text: string){
    Swal.fire({
      title: text,
      icon: 'error',
      confirmButtonText: 'ตกลง',
      heightAuto: false
    })
  }
}