import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TopicsService } from './../topics.service';
import { CoursesService } from './../courses.service';
import { ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-detail',
  templateUrl: './check-detail.component.html',
  styleUrls: ['./check-detail.component.scss'],
})
export class CheckDetailComponent implements OnInit {
  courses;
  coursesdata;
  value;
  form;
  timedata;
  data;
  sum;
  isHigher;
  isApprove;
  private unSubAll$ = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tableDisplayColumn: string[] = [
    'id',
    'name',
    'noquestions',
    'random',
    'status',
    'description',
  ];

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private topicsSV: TopicsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      test_time: [0, Validators.required],
      full_score: [0, Validators.required],
      percent_full_score: [0, Validators.required],
      passing_score: null,
    });

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.coursesService
        .get(+params.get('coursesCourse_id'))
        .subscribe((result) => {
          this.form.patchValue(result);
          this.courses = result;
          this.cdr.detectChanges()
          const isApprove = this.courses.topics.some(x => x.is_approve == null)
          this.isApprove = isApprove
          const sum = this.courses.topics.reduce(
            (a, b) => a + b.no_of_random,
            0
          );
          this.sum = sum;
          this.courses.topics = new MatTableDataSource(this.courses.topics);
          this.courses.topics.paginator = this.paginator;
          this.unSubAll$.next(true);
        });
    });
  }


  sumRan(){
    const re = this.isNull()
    if(re == true){
      this.isHigher = true
    } else {
      const isHigher = this.courses.topics.data.some(x => x.no_of_random > x.no_of_choices + x.no_of_matchings)
      this.isHigher = isHigher
    }
    const sum = this.courses.topics.data.reduce(
      (a, b) => a + b.no_of_random,
      0
    );
    this.sum = sum;
  }

  isNull(){
    const isNull = this.courses.topics.data.some(x => x.no_of_random <= 0)
    return isNull;
  }

  save() {
    this.route.paramMap.subscribe((params) => {
      this.coursesService
        .get(+params.get('coursesCourse_id'))
        .subscribe((result) => {
          this.unSubAll$.next(true);
          this.data = result;
          // this.data.is_use = true;
          this.data.test_time = this.form.get('test_time').value;
          this.data.passing_score = this.form.get('passing_score').value;
          this.data.full_score = this.form.get('full_score').value;
          this.data.percent_full_score = this.form.get(
            'percent_full_score'
          ).value;
          this.coursesService
            .update(this.data.course_id, this.data)
            .subscribe((res) => {
              this.unSubAll$.next(true);
              this.success('บันทึกสำเร็จ')
              this.courses.topics._data._value.map((data) => {

                if (data.no_of_random > (data.no_of_matchings + data.no_of_choices) - data.no_of_suspend){
                  this.error('คุณกรอกจำนวนสุ่มคำถามเกินคำถามที่มีอยู่กรุณากรอกใหม่')
                }
                else if (data.is_approve === null){
                  {
                    this.error('กรุณาตรวจคำถามให้ครบทุกข้อ')
                  }
                }
                else {
                  this.topicsSV.update(data.topic_id, data).subscribe(x => {
                    this.unSubAll$.next(true);
                    this.router.navigate(['check']);
                  });
                }
              });
            });
        });
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

  error(text: string){
    Swal.fire({
      title: text,
      icon: 'error',
      confirmButtonText: 'ตกลง',
      heightAuto: false
    })
  }

  setPassing(){
    this.form.get('passing_score').setValue(null)
  }

  suspend() {
    this.route.paramMap.subscribe((params) => {
      this.unSubAll$.next(true);
      this.coursesService
        .get(+params.get('coursesCourse_id'))
        .subscribe((result) => {
          this.unSubAll$.next(true);
          this.coursesdata = result;
          this.coursesdata.is_use = false;
          this.coursesService
            .update(this.coursesdata.course_id, this.coursesdata)
            .subscribe(x => {
              this.unSubAll$.next(true);
              this.success('ระงับใช้ข้อสอบเรียบร้อยแล้ว')
              this.router.navigate(['check'])
            });
        });
    });
  }

  sendBack(){
    this.route.paramMap.subscribe((params) => {
      this.unSubAll$.next(true);
      this.coursesService
        .get(+params.get('coursesCourse_id'))
        .subscribe((result) => {
          this.unSubAll$.next(true);
          this.coursesdata = result;
          this.coursesdata.is_send_approve = null;
          this.coursesService
            .update(this.coursesdata.course_id, this.coursesdata)
            .subscribe(x => {
              this.unSubAll$.next(true);
              this.success('ส่งคืนข้อสอบเรียบร้อยแล้ว')
              this.router.navigate(['check']);
            });
        });
    });
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.courses.topics.filter = filterValue.trim().toLowerCase();
  }

  back(){
    this.router.navigate(['check']);
  }
}
