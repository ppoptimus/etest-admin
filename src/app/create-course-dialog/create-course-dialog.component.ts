import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormArray,
  FormControl,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { tap, takeUntil } from 'rxjs/operators';
import { CoursesService } from '../courses.service';
import { Subject } from 'rxjs';
import { OccupationGroupService } from '../occupation-group.service';

@Component({
  selector: 'app-create-course-dialog',
  templateUrl: './create-course-dialog.component.html',
  styleUrls: ['./create-course-dialog.component.scss'],
})
export class CreateCourseDialogComponent implements OnInit {
  createForm: FormGroup;
  courses;
  occupation;
  tableDisplayColumns: string[] = ['topic_name', 'action'];
  public get getTopic(){
    return this.createForm.get('topics') as FormArray;
  }
  private unSubAll$ = new Subject<boolean>();
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  constructor(
    private coursesService: CoursesService,
    private occupationService: OccupationGroupService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm = this.formBuilder.group({
      occupation_group_id: new FormControl('', [Validators.required]),
      level: ['', [Validators.required]],
      course_name: ['', [Validators.required]],
      course_code: ['', [Validators.required]],
      is_approve: [null],
      is_use: null,
      is_send_approve: null,
      passing_score: [null],
      test_time: [null],
      topics: this.formBuilder.array([]),
    });
  }
  ngOnInit(): void {
    this.occupationService.getAll().subscribe((result) => {
      this.occupation = result;
    });
    this.createForm
      .get('topics')
      .valueChanges.pipe(
        tap((result) => (this.courses = result)),
        takeUntil(this.unSubAll$)
      )
      .subscribe();
  }

  createtopicsForm(topic_name: string) {
    return this.formBuilder.group({
      topic_code: [this.makeid(4)],
      course_code: [''],
      topic_name: [topic_name],
      is_aprove: null,
      questions: this.formBuilder.array([]),
    });
  }

  addForm() {
    let form = this.createForm.get('topics') as FormArray;
    let name = this.input.nativeElement.value;
    form.push(this.createtopicsForm(name));
  }

  remove(index: number) {
    let form = this.createForm.get('topics') as FormArray;
    form.removeAt(index);
  }

  saveCourse() {
    let request = this.createForm.getRawValue();
    request.course_code = request.course_code + '|' + request.level
    this.coursesService.add(request).subscribe((result) => {
      this.unSubAll$.next(true);
      this.dialogRef.close();
      window.location.reload();
    });
  }
  onCancelClick() {
    this.dialogRef.close();
    this.unSubAll$.next(true);
  }
  makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
