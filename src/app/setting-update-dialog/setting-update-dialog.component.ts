import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { OccupationGroupService } from '../occupation-group.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting-update-dialog',
  templateUrl: './setting-update-dialog.component.html',
  styleUrls: ['./setting-update-dialog.component.scss']
})

export class SettingUpdateDialogComponent implements OnInit {
  updateForm;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, 
              private occupationService: OccupationGroupService) {
    this.updateForm = formBuilder.group({
    occupation_group_code: [''],
    occupation_group_id: [''],
    occupation_group_name: ['']
  }); }

  ngOnInit(): void {
    this.updateForm.get('occupation_group_id').setValue(this.data.occupationData.occupation_group_id);
  }
  update(value){
    let request = this.updateForm.getRawValue();
    this.occupationService.update(request.occupation_group_id, request).subscribe(x => {
      this.success('อัพเดตเรียบร้อยแล้ว')
    });
    
  }

  success(text: string){
    Swal.fire({
      title: text,
      icon: 'success',
      confirmButtonText: 'ตกลง',
      heightAuto: false
    })
  }

}
