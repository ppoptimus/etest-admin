import { DrawerService } from './../../../drawer.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') public drawer: MatDrawer;
  constructor(
    private authService: AuthService,
    private router: Router,
    private drawerSV: DrawerService
  ) {}
  role;
  hide;
  ngOnInit(): void {
    this.role = this.authService.currentUserValue;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngAfterViewInit(): void {
    this.drawerSV.setDrawer(this.drawer);
  }

  checkRole(role:string): boolean {
    // console.log(role)
    if(role == "รายงาน"){
      let res = this.role.permissions?.filter(x => x.menu_name == role)
      if(res[0]) {
        return true
      } else {
        return false
      }
    } else {
      let res = this.role.permissions?.filter(x => x.menu_name == role)
      res = res?.find(x => x.can_add == 'y')
      if(res){
        return true;
      }
      else {
        return false
      }
    }
  
  }
}
