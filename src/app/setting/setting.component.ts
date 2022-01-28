import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OccupationGroupService } from '../occupation-group.service';
import { MatDialog } from '@angular/material/dialog';
import { SettingUpdateDialogComponent } from '../setting-update-dialog/setting-update-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tableDisplayColumns: string[] = ['1' , 'id', 'name', 'edit', 'delete'];
  occupation;
  createForm;
  constructor(private occupationService: OccupationGroupService, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.createForm = this.formBuilder.group({
    occupation_group_code: ['', [Validators.required]],
    occupation_group_name: ['', [Validators.required]]});
  }

  ngOnInit(): void {
    this.occupationService.getAll().subscribe(result =>
      {
       this.occupation = new MatTableDataSource(result);
       this.occupation.paginator = this.paginator;
      });
  }
  save(form) {
    let request  = this.createForm.getRawValue();
    this.occupationService.add(request).subscribe(result => {
      window.location.reload();
    })
    ;
  }
  deleteData(id) {
    Swal.fire({
      title: 'คุณต้องการลบกลุ่มสาขาอาชีพนี้ใช่ไหม?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'ลบเรียบร้อยแล้ว',
          '',
          'success'
        )
        this.occupationService.deleteDate(id).subscribe(data => {
          window.location.reload();
      });
      }
    })
}

openSettingUpdateDialog(occupation) {
  const dialogRef = this.dialog.open(SettingUpdateDialogComponent, {
    width: '500px', height: '250px',
    // data: 'คุณแน่ใจไหมที่ต้องการลบข้อมูลนี้'
    data: {title: 'Update' , message: 'Update' , occupationData: occupation}
  });
}

}
