import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user.interface';
import { LoginService } from '../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private loginService: LoginService, private router: Router, private snackbar: MatSnackBar) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentRrUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  isLoggedIn = false;

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getAuthorizationHeaderValue(): string {
    return `Bearer ${this.currentUserValue?.token}`
    // return `${this.currentUserValue?.token_type} ${this.currentUserValue?.access_token}`;
  }


  isUserLogin() {
    return this.isLoggedIn;
  }

  login(data) {
    this.loginService.login(data).subscribe((res) => {
      this.isLoggedIn = true;
      localStorage.setItem('currentRrUser', JSON.stringify(res));
      this.currentUserSubject.next(res);
      this.router.navigate(['/home']);
    },
    error => { 
      this.error('กรุณากรอก Username หรือ Password ให้ถูกต้อง')
    }
    );
  }

  logout() {
    localStorage.removeItem('currentRrUser');
    this.isLoggedIn = false;
    this.currentUserSubject.next(null);
  }

  success(text: string){
    Swal.fire({
      title: text,
      icon: 'success',
      confirmButtonText: 'ตกลง',
      heightAuto: false
    })
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


