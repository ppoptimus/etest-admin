import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn;
  data;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = true;
    this.data = this.authService.currentUserValue;
  }

}
