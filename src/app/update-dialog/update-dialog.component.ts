import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CoursesService } from '../courses.service';
import { Subject } from 'rxjs';
import { TopicsService } from '../topics.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { OccupationGroupService } from '../occupation-group.service';
import { tap, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss'],
})
export class UpdateDialogComponent implements OnInit {
  updateForm;
  courses;
  occupation;
  table;
  tableDisplayColumns: string[] = ['name', 'actions'];
  private unSubAll$ = new Subject<boolean>();
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  public get getTopic(){
    return this.updateForm.get('topics') as FormArray;
  }
  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private topicsService: TopicsService,
    public dialog: MatDialog,
    private occupationService: OccupationGroupService,
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    private sb: MatSnackBar,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateForm = formBuilder.group({
      course_id: [data.courseData.course_id],
      course_name: [data.courseData.course_name],
      course_code: [data.courseData.course_code],
      is_approve: [null],
      level: [data.courseData.level],
      occupation_group_id: [data.courseData.occupation_group_id],
      topics: this.formBuilder.array([
        //     // this.createtopicsForm(),
        //     // this.createtopicsForm(),
        //     // this.createtopicsForm(),
      ]),
    });
  }

  ngOnInit(): void {
    this.occupationService.getAll().subscribe((result) => {
      this.occupation = result;
    });
    this.coursesService.get(this.data.courseData.course_id).subscribe((x) => {
      this.courses = x;
      this.updateForm.setControl('topics', this.formBuilder.array(this.courses.topics.map(x => this._createtopicsForm(x))));
      this.table = this.updateForm.get('topics').value;
      this.updateForm.get('topics').valueChanges
      .pipe(
        tap(x => this.table = x),
        tap(x => this.unSubAll$.next(true)))
      .subscribe();
    });
  }

  remove(index){
    const form = this.updateForm.get('topics') as FormArray;
    form.removeAt(index);
  }


  updateCourse(courseData) {
    courseData.course_id = this.data.courseData.course_id;
    this.unSubAll$.next(true);
  }

  update() {
    const form = this.updateForm.getRawValue();
    this.coursesService.update(form.course_id, form)
      .subscribe((result) => {
        this.unSubAll$.next(true);
        this.sb.open('แก้ไขสำเร็จ', '', { duration: 1000 });
        window.location.reload();
      });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  openConfirmDialog(productId) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete',
        message: 'คุณต้องการที่จะลบข้อมูลนี้ใช่ไหม',
        id: productId,
      },
    });
  }
  createtopicsForm(topic_name: string) {
    return this.formBuilder.group({
      topic_code: [this.makeid(4)],
      course_id: [this.data.courseData.course_id],
      topic_name: [topic_name],
      topic_id: null,
      is_approve: null,
      no_of_random: null,
      questions: this.formBuilder.array([]),
    });
  }

  _createtopicsForm(x) {
    return this.formBuilder.group({
      topic_code: x.topic_code,
      course_id: x.course_id,
      topic_name: x.topic_name,
      topic_id: x.topic_id,
      is_approve: x.is_approve,
      no_of_random: x.no_of_random,
      questions: x.questions,
    });
  }
  addForm() {
    let form = this.updateForm.get('topics') as FormArray;
    let name = this.input.nativeElement.value;
    form.push(this.createtopicsForm(name));
  }
  addTopic(courseData) {
    this.topicsService.add(courseData).subscribe((result) => {
      alert('เพิ่มหัวข้อสำเร็จ');
    });
  }

  makeid(length) {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
