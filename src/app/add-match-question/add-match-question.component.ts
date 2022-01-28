import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../question.service';
import { TopicsService } from '../topics.service';
import { concatMap, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog/upload-dialog.component';
import { Subject } from 'rxjs';
import { CoursesService } from '../courses.service';
import { UploadService } from '../upload.service';
import { BaseForm } from '../core/base/base-form';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-match-question',
  templateUrl: './add-match-question.component.html',
  styleUrls: ['./add-match-question.component.scss'],
})
export class AddMatchQuestionComponent extends BaseForm implements OnInit {
  leftColumns: string[] = ['1', '2', '3' , '4'];
  displayedColumns: string[] = ['id', 'name', 'random', 'delete'];
  displayedColumns2: string[] = ['id', 'name', '1', '0', '-1'];
  createForm;
  courses;
  question;
  courseData;
  tinymceInit;
  specialist;
  displayMatch;
  resData;
  private unSubAll$ = new Subject<boolean>();
  textthai = ['ก', 'ข', 'ค', 'ง', 'จ', 'ฉ', 'ช', 'ซ', 'ฌ', 'ด', 'ต'];
  public get getForm(): FormArray {
    return this.createForm.get('choices') as FormArray;
  }
  public get getLeftForm(): FormArray {
    return this.createForm.get('question_matches') as FormArray;
  }
  public get getspecialistForm(): FormArray {
    return this.createForm.get('specialistScores') as FormArray;
  }
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private topicsService: TopicsService,
    private dialog: MatDialog,
    private courseSV: CoursesService,
    private uploadSV: UploadService,
    public activeRoute: ActivatedRoute
  ) {
    super(activeRoute)
    this.tinymceInit = {
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern autoresize',
      ],
      document_base_url: 'https://miro.medium.com',
      relative_urls: false,
      remove_script_host: true,
      video_template_callback: function(data) {
        return '<video width="' + 450 + '" height="' + 225 + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' + '<source src="' + data.source + '"' + (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') + ' />\n' + (data.altsource ? '<source src="' + data.altsource + '"' + (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</video>';
      },
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
        // handle url 
        // cb('https://miro.medium.com/max/11400/1*lS9ZqdEGZrRiTcL1JUgt9w.jpeg');
        input.onchange = function() {
          let file = input.files[0];
          let reader = new FileReader();
          const formData: FormData = new FormData();
          formData.append('file', file, file.name);
          uploadSV.uploadDocument(formData).subscribe((x: any) => {
              if(x.status == 'success') {
              cb(x.message[0].file_name)
              }
            });
          reader.readAsDataURL(file);
        }
        input.click();
      },
    };
    this.createForm = this.formBuilder.group({
      topic_id: [''],
      question_name: ['', [Validators.required]],
      is_approve: [null],
      is_suspend: [null],
      is_match: [true],
      match_question_name: [''],
      choices: this.formBuilder.array([
        this.createchoicesForm(),
        this.createchoicesForm(),
        this.createchoicesForm(),
        this.createchoicesForm(),
      ]),
      question_matches: this.formBuilder.array([
        this.createMatchChoice(),
        this.createMatchChoice(),
        this.createMatchChoice(),
        this.createMatchChoice(),
      ]),
      specialistScores: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.createForm.get('question_matches').valueChanges.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      tap((result) => (this.displayMatch = result)),
      tap(x => this.unSubAll$.next(true))).subscribe();
    this.createForm.get('choices').valueChanges.pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        tap((result) => (this.question = result)),
        tap(x => this.unSubAll$.next(true))).subscribe();
    this.route.paramMap.subscribe((result: any) => {
      this.topicsService
        .get(`${result.params.topicsTopic_id}`)
        .subscribe((a) => {
          this.unSubAll$.next(true)
          this.courses = a;
          this.createForm.get('topic_id').setValue(this.courses.topic_id);
        });
    });
  }
  addForm() {
    this.getForm.push(this.createchoicesForm());
  }

  addLeftForm(){
    this.getLeftForm.push(this.createMatchChoice());
  }

  createMatchChoice(){
    return this.formBuilder.group({
      question_match_id: null,
      question_id: null,
      question_match_no: null,
      question_name: ['', [Validators.required]],
      correct_choice_id: null,
    })
  }

  _createMatchChoice(x){
    return this.formBuilder.group({
      question_match_id: x.question_match_id,
      question_id: x.question_id,
      question_match_no: x.question_match_no,
      question_name: x.question_name,
      correct_choice_id: x.correct_choice_id,
    })
  }
  createchoicesForm() {
    return this.formBuilder.group({
      choice_no: [null],
      question_id: [null],
      choice_name: ['', [Validators.required]],
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
  saveQuestion(courseData) {
    let request = this.createForm.getRawValue();
    this.courses.is_approve = null;
    this.topicsService.update(this.courses.topic_id , this.courses)
      .pipe(
      concatMap(x => this.questionService.add(request)),
      tap(x => this.resData = x),
      tap(x => this.getLeftForm.clear()),
      tap(x => this.resData.question_matches.map(x => this.getLeftForm.push(this._createMatchChoice(x)))),
      concatMap(x => this.courseSV.get(this.courses.course_id)),
      tap(x => this.courseData = x),
      tap(x => this.courseData.is_approve = this.courseData.topics.every((x) => x.is_use === true)),
      concatMap(x => this.courseSV.update(this.courseData.course_id, this.courseData)))
      .subscribe( x => {
        this.unSubAll$.next(true);
      });
  }

  saveUpdate(){
    const form = this.createForm.getRawValue();
    const data = {...this.resData}
    data.question_matches = form.question_matches
    data.question_matches.map(x => {
      let a = data.choices.find(a => x.correct_choice_id === a.choice_id)
      a.is_correct = true;
    })
    this.questionService.update(data.question_id,data).subscribe(x => {
      this.success('เพิ่มคำถามสำเร็จ')
      window.history.back()
    })
  }

  check1(index, checked) {
    if (checked.checked) {
      this.getForm.at(index).get('is_random').setValue(true);
    } else {
      this.getForm.at(index).get('is_random').setValue(false);
    }
  }

  remove(index: number) {
    this.getForm.removeAt(index);
  }

  removeChoice(index: number){
    this.getLeftForm.removeAt(index)
  }

  leftChange(index,event){
    this.getLeftForm.at(index).get('correct_choice_id').setValue(event.value);
  }

  back() {
    window.history.back();
  }

  uploadDialog() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '600px',
      height: '550px',
      data: { title: 'Update', message: 'Update' },
      backdropClass: 'backdropBackground',
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

}
