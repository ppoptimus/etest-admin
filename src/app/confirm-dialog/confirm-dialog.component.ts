import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../courses.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  private unSubAll$ = new Subject<boolean>();
  constructor(
    private coursesService: CoursesService,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
  onCancelClick(): void {
    this.dialogRef.close();
  }
  deleteData(id) {
    this.coursesService.deleteDate(id).subscribe((data) => {
      this.unSubAll$.next(true);
      const timeout = 500;
      const dialogRef = this.dialog.open(SuccessDialogComponent, {
        width: '400px',
        height: '189px',
        data: { title: 'Update', message: 'Update' },
      });
      dialogRef.afterOpened().subscribe((res) => {
        this.unSubAll$.next(true);
        setTimeout(() => {
          window.location.reload();
        }, timeout);
      });
    });
  }
}
