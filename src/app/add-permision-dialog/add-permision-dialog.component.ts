import { RoleService } from './../role.service';
import { takeUntil, tap } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

interface Food {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'ผู้ดูแลระบบ', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'ผู้ตรวจสอบ', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'ผู้นำเข้าข้อสอบ', weight: 6.941, symbol: 'Li' },
  {
    position: 4,
    name: 'กำหนดสิทธิ์ผู้เข้ารับการทดสอบ',
    weight: 6.941,
    symbol: 'Li',
  },
  { position: 5, name: 'ผู้ใช้งาน', weight: 6.941, symbol: 'Li' },
  { position: 6, name: 'ดูข้อมูลคำตอบย้อนหลัง', weight: 6.941, symbol: 'Li' },
];

@Component({
  selector: 'app-add-permision-dialog',
  templateUrl: './add-permision-dialog.component.html',
  styleUrls: ['./add-permision-dialog.component.scss'],
})
export class AddPermisionDialogComponent implements OnInit {
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'เปิดการใช้งาน' },
    { value: 'pizza-1', viewValue: 'ปิดการใช้งาน' },
  ];
  tableDisplayColumns: string[] = ['id', 'name', 'status'];
  form: FormGroup;
  dataSource = ELEMENT_DATA;
  loginData;
  roleData;
  userData;
  public get getForm(): FormArray {
    return this.form.get('loginRoles') as FormArray;
  }
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private roleService: RoleService
  ) {
    this.form = formBuilder.group({
      login_id: [''],
      user_name: [''],
      password: [''],
      display_name: [''],
      user_type: [''],
      loginRoles: this.formBuilder.array([
        //     // this.createtopicsForm(),
        //     // this.createtopicsForm(),
        //     // this.createtopicsForm(),
      ]),
    });
  }

  ngOnInit(): void {
    this.loginService.get().subscribe((res) => {
   
      this.loginData = res;
    });
    this.roleService.get().subscribe((res) => {
    
      this.roleData = res;
    })
  }

  onChange(id) {
  
    this.loginService.getid(id).subscribe((res) => {
  
      this.userData = res;
      this.setUpForm(res);
    });
  }

  setUpForm(res) {
    this.form.get('login_id').setValue(this.userData.login_id);
    this.form.get('user_name').setValue(this.userData.user_name);
    this.form.get('password').setValue(this.userData.password);
    this.form.get('display_name').setValue(this.userData.display_name);
    this.form.get('user_type').setValue(this.userData.user_type);
    this.getForm.clear();
    this.form.setControl(
      'loginRoles',
      this.formBuilder.array(
        res.roles.map((role) => this.createroleForm(role))
      )
    );
  }

  createroleForm(data) {
    return this.formBuilder.group({
      login_role_id: [data.login_role_id],
      login_id: [data.login_id],
      role_id: [data.role_id],
    });
  }

  _createroleForm(data) {
    return this.formBuilder.group({
      role_id: [data],
    });
  }

  addForm(data) {
    this.getForm.push(this._createroleForm(data));
  }

  check(index, checked) {
    if(index == 0 && checked.checked == true){
      this.addForm(1)
    }
    else{
      let form = this.form.get('loginRoles') as FormArray;
      form.removeAt(0);
    }
    if(index == 1){
      this.addForm(2)
    }
    if(index == 2){
      this.addForm(3)
    }
    if(index == 3){
      this.addForm(4)
    }
    if(index == 4){
      this.addForm(5)
    }
    if(index == 5){
      this.addForm(6)
    }
}

}
