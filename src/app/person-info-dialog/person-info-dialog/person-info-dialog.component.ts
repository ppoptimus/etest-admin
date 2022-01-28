import { ExamineeService } from './../../examinee.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-person-info-dialog',
  templateUrl: './person-info-dialog.component.html',
  styleUrls: ['./person-info-dialog.component.scss']
})
export class PersonInfoDialogComponent implements OnInit {
  examineedata;
  examPicture;
  constructor(
    private examineeService: ExamineeService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.examineeService.getTestId(this.data.id.test_id).subscribe((res =>{
      this.examineedata = res;
      this.examineeService.getExamineeData(this.examineedata.test.citizen_id).subscribe((x => {
        this.examPicture = x[0].candidate_img_base64
      }))
    }))
  }

}
