import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { CreateCourseDialogComponent } from '../create-course-dialog/create-course-dialog.component';
import { CoursesService } from '../courses.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent implements OnInit {
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  courses;
  private unSubAll$ = new Subject<boolean>();
  tableDisplayColumns: string[] = ['id', 'name', 'level', 'question_no' , 'career', 'description' , 'actions'];
  constructor(
    private coursesService: CoursesService ,
    private dialog: MatDialog,
    private sb: MatSnackBar,
    private courseSV: CoursesService
    ) {

    }
  openConfirmDialog(course_id) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {title: 'Delete' , message: 'คุณต้องการที่จะลบข้อมูลนี้ใช่ไหม', id: course_id}
    });
  }

  deleteCourse(id){
    Swal.fire({
      title: 'คุณต้องการลบสาขานี้ใช่ไหม?',
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
        this.courseSV.deleteDate(id).subscribe(data => {
          window.location.reload();
      });
      }
    })
  }

  openUpdateDialog(course) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '600px', height: '550px',
      data: {title: 'Update' , message: 'Update' , courseData: course}
    });
  }

  openCreateCourseDialog() {
    const dialogRef = this.dialog.open(CreateCourseDialogComponent, {
      width: '600px', height: '550px',
      data: {title: 'Update' , message: 'Update' },
      backdropClass: 'backdropBackground'
    });
  }

  ngOnInit(): void {
    this.coursesService.getAll().subscribe(result =>
      {
        this.unSubAll$.next(true);
        this.courses = result;
        this.courses = this.courses.sort((a, b) => {
          if (a.course_id > b.course_id) {
            return -1;
          } else if (a.course_id < b.course_id) {
            return 1;
          } else {
            return 0;
          }
        });
        this.courses = this.courses.map((x: any, index) => ({...x, index: index + 1}));
        this.courses = new MatTableDataSource(this.courses);
        this.courses.paginator = this.paginator; });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.courses.filter = filterValue.trim().toLowerCase();
  }

}





