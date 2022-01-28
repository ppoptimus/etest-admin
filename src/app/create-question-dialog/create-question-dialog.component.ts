import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-question-dialog',
  templateUrl: './create-question-dialog.component.html',
  styleUrls: ['./create-question-dialog.component.scss']
})
export class CreateQuestionDialogComponent implements OnInit {
action;
  constructor(public dialogRef: MatDialogRef<CreateQuestionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
