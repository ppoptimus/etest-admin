import { AddPermisionDialogComponent } from './../../../add-permision-dialog/add-permision-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/role.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.container.html',
  styleUrls: ['./permission.container.scss']
})
export class PermissionContainer implements OnInit {
  loginList$ = new Observable()
  constructor(private roleSV: RoleService, private loginSV: LoginService, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.loginList$ = this.loginSV.get();
  }

  addPerm(){
    const dialogRef = this.dialog.open(AddPermisionDialogComponent, {
      width: '915px', height: '700px',
      data: {title: 'Update' , message: 'Update' },
    });
  }

}
