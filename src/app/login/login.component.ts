import { RoleService } from './../role.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {}

  form: FormGroup; // {1}
  private formSubmitAttempt: boolean; // {2}
  loginInvalid = false;
  constructor(
    private roleService: RoleService,
    public http: HttpClient,
    private router: Router,
    private fb: FormBuilder, // {3}
    private authService: AuthService // {4}
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      // {5}
      user_name: ['', Validators.required],
      password: ['', Validators.required],
    });
    if (this.authService.isUserLogin){
      this.router.navigate(['/home']);
    }
  }

  isFieldInvalid(field: string) {
    // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value); // {7}
      this.formSubmitAttempt = true;
      // this.router.navigate(['/home']);
    }
  }



}
