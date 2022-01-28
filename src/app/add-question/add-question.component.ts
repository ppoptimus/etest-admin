import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TopicsService } from '../topics.service';
import { tap, distinctUntilChanged, concatMap, catchError } from 'rxjs/operators';
import { SpecialistService } from '../specialist.service';
import { QuestionService } from '../question.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog/upload-dialog.component';
import { Subject, throwError } from 'rxjs';
import { CoursesService } from '../courses.service';
import { UploadService } from '../upload.service';
import { BaseForm } from '../core/base/base-form';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent extends BaseForm implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'answer', 'random', 'delete'];
  displayedColumns2: string[] = ['id', 'name', '1', '0', '-1'];
  createForm;
  courses;
  question;
  tinymceInit;
  url: string;
  specialist;
  courseData;
  uploadlog = {
    status:null,
    message: []
  };
  private unSubAll$ = new Subject<boolean>();
  textthai = ['ก', 'ข', 'ค', 'ง', 'จ', 'ฉ', 'ช', 'ซ', 'ฌ', 'ด', 'ต'];
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  public get getForm(): FormArray {
    return this.createForm.get('choices') as FormArray;
  }

  public get getspecialistForm(): FormArray {
    return this.createForm.get('specialistScores') as FormArray;
  }
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private topicsService: TopicsService,
    private questionService: QuestionService,
    private dialog: MatDialog,
    private courseSV: CoursesService,
    private uploadSV: UploadService,
  ) {
    super(route)
    this.createForm = this.formBuilder.group({
      topic_id: [''],
      question_name: ['', [Validators.required]],
      is_approve: [null],
      is_suspend: [null],
      is_match: [false],
      match_question_name: [null],
      choices: this.formBuilder.array([
        this.createchoicesForm(),
        this.createchoicesForm(),
        this.createchoicesForm(),
        this.createchoicesForm(),
      ]),
      specialistScores: this.formBuilder.array([]),
    });

    this.tinymceInit = {
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern autoresize',
      ],

      document_base_url: 'test',
      video_template_callback: function(data) {
        return '<video width="' + 450 + '" height="' + 225 + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' + '<source src="' + data.source + '"' + (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') + ' />\n' + (data.altsource ? '<source src="' + data.altsource + '"' + (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</video>';
      },
      relative_urls: false,
      remove_script_host: true,
      forced_root_block: false,
      force_br_newlines: true,
      force_p_newlines: false,
      branding: false,
      toolbar:
        'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
      image_advtab: true,
      file_picker_callback: function (cb, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/* audio/* video/*');
        input.onchange = function() {
          let file = input.files[0];
          let reader = new FileReader();
          // if(file.type === 'video/mp4' || file.type === 'audio/mpeg'){
            const formData: FormData = new FormData();
            formData.append('file', file, file.name);
            uploadSV.uploadDocument(formData).subscribe((x: any) => {
              if (x.status === 'success'){
                cb(x.message[0].file_name)
              }
            });
          // } else {
          //   reader.onload = function () {
          //     let base64 = (reader.result as string).split(',')[1];
          //     let prefixBase64 = `data:${file.type};base64,${base64}`
          //     cb(prefixBase64, { title: file.name });
          //   };
          // }
          reader.readAsDataURL(file);
        }
        input.click();
      },
    };
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((result: any) => {
      this.topicsService
        .get(`${result.params.topicsTopic_id}`)
        .subscribe((a) => {
          this.unSubAll$.next(true);
          this.courses = a;
          this.createForm.get('topic_id').setValue(this.courses.topic_id);
        });
    });
    // this.topicsService.get(this.id).pipe(
    //   tap(x => this.courses = x),
    //   tap(x => this.createForm.get('topic_id').setValue(this.courses.topic_id)),
    //   tap(x => this.unSubAll$.next(true))
    //   ).subscribe()
    this.createForm
      .get('choices')
      .valueChanges.pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        tap((result) => (this.question = result)),
        tap(x => this.unSubAll$.next(true))
        )
      .subscribe();
  }

  createchoicesForm() {
    return this.formBuilder.group({
      choice_id: [null],
      choice_no: [null],
      question_id: [null],
      choice_name: [null],
      is_correct: [false],
      is_random: [false],
    });
  }

  createspecialistForm(id) {
    return this.formBuilder.group({
      specialist_id: [id],
      question_id: [null],
      score: [0],
    });
  }

  addForm() {
    this.getForm.push(this.createchoicesForm());
  }

  remove(index: number) {
    this.getForm.removeAt(index);
  }

  check(index, checked) {
    this.getForm.controls.map((form: FormGroup, _index) => {
      if (_index == index) {
        this.getForm.at(index).get('is_correct').setValue(true);
      } else {
        this.getForm.at(_index).get('is_correct').setValue(false);
      }
    });
  }

  check1(index, checked) {
    // let formArray = this.createForm.get('choices') as FormArray
    if (checked.checked) {
      this.getForm.at(index).get('is_random').setValue(true);
    } else {
      this.getForm.at(index).get('is_random').setValue(false);
    }
  }

  checkminus1(index, checked) {
    // let formArray = this.createForm.get('choices') as FormArray
    this.getspecialistForm.at(index).get('score').setValue(-1);
  }

  saveQuestion() {
    const form = this.createForm.get('choices').value;
    const check = form.every(x => x.is_correct === false);
    if (check === true){
      this.error()
    } else {
      let request = this.createForm.getRawValue();
      this.courses.is_approve = null;
      this.topicsService.update(this.courses.topic_id , this.courses)
      .pipe(
      catchError(x => {
        this.error1('มีข้อผิดพลาดในการเพิ่มคำถาม')
        window.history.back();
        return throwError(x);
      }),
      concatMap(x => this.questionService.add(request)),
      tap(x => this.success('เพิ่มคำถามสำเร็จ')),
      concatMap(x => this.courseSV.get(this.courses.course_id)),
      tap(x => this.courseData = x),
      tap(x => this.courseData.is_approve = this.courseData.topics.every((x) => x.is_use === true)),
      concatMap(x => this.courseSV.update(this.courseData.course_id, this.courseData)),
      tap(x => window.history.back()))
      .subscribe();
    }
  }
  back() {
    window.history.back();
  }

  uploadDialog(){
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '600px', height: '550px',
      data: {title: 'Update' , message: 'Update' },
      backdropClass: 'backdropBackground'
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

  error(){
    Swal.fire({
      title: 'กรุณาเลือกคำตอบ',
      icon: 'error',
      confirmButtonText: 'ตกลง',
      heightAuto: false
    })
  }

  error1(text: string){
    Swal.fire({
      title: text,
      icon: 'error',
      confirmButtonText: 'ตกลง',
      heightAuto: false
    })
  }
}
