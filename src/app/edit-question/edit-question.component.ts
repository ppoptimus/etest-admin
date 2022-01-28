import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concatMap, distinctUntilChanged, tap } from 'rxjs/operators';
import { QuestionService } from '../question.service';
import { ChoiceService } from '../choice.service';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog/upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TopicsService } from '../topics.service';
import { CoursesService } from '../courses.service';
import { UploadService } from '../upload.service';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent implements OnInit {
  tinymceInit;
  questiondata;
  table;
  resData: boolean = false;
  displayMatch;
  url: string | ArrayBuffer ;
  uploadlog;
  leftquestion = [{ match_question_name: '' }];
  displayedColumns: string[] = ['id', 'name', 'answer', 'random', 'delete'];
  column = ['1', '2', '3', '4'];
  textthai = ['ก', 'ข', 'ค', 'ง', 'จ', 'ฉ', 'ช', 'ซ', 'ฌ', 'ด', 'ต'];
  leftColumns: string[] = ['1', '2', '3', '4'];
  form: FormGroup;
  displayMatchTable;
  public get getForm(): FormArray {
    return this.form.get('choices') as FormArray;
  }
  public get getLeftForm(): FormArray {
    return this.form.get('question_matches') as FormArray;
  }
  private unSubAll$ = new Subject<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private dialog: MatDialog,
    private topicSV: TopicsService,
    private courseSV: CoursesService,
    private uploadSV: UploadService
  ) {
    this.form = this.formBuilder.group({
      question_id: [''],
      topic_id: [''],
      question_no: [''],
      question_name: [''],
      is_approve: [null],
      is_match: [null],
      match_question_name: [''],
      choices: this.formBuilder.array([]),
      question_matches: this.formBuilder.array([]),
      specialistScores: this.formBuilder.array([]),
    });

    this.tinymceInit = {
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace  visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern autoresize',
      ],
      height: '150',
      document_base_url: 'https://miro.medium.com',
      video_template_callback(data) {
        return '<video width="' + 450 + '" height="' + 225 + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' + '<source src="' + data.source + '"' + (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') + ' />\n' + (data.altsource ? '<source src="' + data.altsource + '"' + (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</video>';
      },
      relative_urls: false,
      remove_script_host: true,
      forced_root_block: false,
      branding: false,
      force_br_newlines: true,
      force_p_newlines: false,
      toolbar:
        'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
      image_advtab: true,
      file_picker_callback (cb, value, meta) {
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/* audio/* video/*');
        input.onchange = function() {
          const file = input.files[0];
          const reader = new FileReader();
          // if (file.type == 'video/mp4'){
            const formData: FormData = new FormData();
            formData.append('file', file, file.name);
            uploadSV.uploadDocument(formData).subscribe((x: any) => {
              if (x.status == 'success') {
              cb(x.message[0].file_name);
              }
            });
          // } else {
          //   reader.onload = function() {
          //     const base64 = (reader.result as string).split(',')[1];
          //     const prefixBase64 = `data:${file.type};base64,${base64}`;
          //     cb(prefixBase64, { title: file.name });
          //   };
          // }
          reader.readAsDataURL(file);
        };
        input.click();
      },
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((result: any) => {
      this.questionService
        .query(`/${result.params.question_id}`)
        .subscribe((a) => {
          this.questiondata = a;
          this.setUpForm(a);
        });
        // this.questionService.audit(`${result.params.question_id}`).subscribe(x => console.log(x))
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
      question_name: '',
      correct_choice_id: null,
    });
  }

  _createMatchChoice(x){
    return this.formBuilder.group({
      question_match_id: x.question_match_id,
      question_id: x.question_id,
      question_match_no: x.question_match_no,
      question_name: x.question_name,
      correct_choice_id: x.correct_choice_id,
    });
  }

  private _createFormChoices(choice) {
    return this.formBuilder.group({
      choice_id: [choice.choice_id],
      question_id: [choice.question_id],
      choice_no: choice.choice_no,
      choice_name: [choice.choice_name],
      is_correct: [choice.is_correct],
      is_random: [choice.is_random],
    });
  }

  createchoicesForm() {
    return this.formBuilder.group({
      choice_id: [null],
      question_id: [this.questiondata.question_id],
      choice_no: null,
      choice_name: [''],
      is_correct: [false],
      is_random: [false],
    });
  }
  setUpForm(res) {
    this.questiondata = res;
    this.form.get('topic_id').setValue(this.questiondata.topic_id);
    this.form.get('question_id').setValue(this.questiondata.question_id);
    this.form.get('question_no').setValue(this.questiondata.question_no);
    this.form.get('is_match').setValue(this.questiondata.is_match);
    this.form.get('question_name').setValue(this.questiondata.question_name);
    this.form.get('match_question_name').setValue(this.questiondata.match_question_name);
    this.getForm.clear();
    this.form.setControl('choices', this.formBuilder.array(res.choices.map((choice) => this._createFormChoices(choice))));
    this.questiondata.question_matches.map(x => this.getLeftForm.push(this._createMatchChoice(x)));
    this.form.get('choices').valueChanges.pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        tap((result) => {(this.table = result); })
      )
      .subscribe();
    this.form.get('question_matches').valueChanges.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      tap((result) => (this.displayMatch = result)),
      tap(x => this.unSubAll$.next(true))).subscribe();
  }

  leftChange(index,event){
    this.getLeftForm.at(index).get('correct_choice_id').setValue(event.value);
  }

  removeChoice(index: number){
    this.getLeftForm.removeAt(index);
  }

  remove(index: number) {
    const form = this.form.get('choices') as FormArray;
    form.removeAt(index);
  }


  update(data) {
    const request = this.form.getRawValue();
    request.is_approve = null;
    let topicData;
    let courseData;
    this.topicSV.get(request.topic_id).pipe(
      tap(x => topicData = x),
      tap(x => topicData.is_approve = null),
      concatMap(x => this.topicSV.update(topicData.topic_id, topicData)),
      concatMap(x =>  this.questionService.update(request.question_id, request)),
      concatMap(x => this.courseSV.get(topicData.course_id)),
      tap(x => courseData = x),
      tap(x => courseData.is_approve = courseData.topics.every((x) => x.is_use === true)),
      concatMap(x => this.courseSV.update(courseData.course_id, courseData))
      ).subscribe(() => {
        this.success('อัพเดตสำเร็จ')
        window.history.back();
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

  saveQuestion(){
    const form = this.form.getRawValue()
    this.questionService.update(form.question_id, form).subscribe(x => {
      this.route.paramMap.subscribe((result: any) => {
        this.questionService
          .query(`/${result.params.question_id}`)
          .subscribe((a) => {
            this.getForm.clear()
            this.getLeftForm.clear()
            this.questiondata = a;
            this.setUpForm(a);
            this.resData = true;
          });
      });
    })
  }

  cancel() {
    window.history.back();
  }


  check1(index, checked) {
    if (checked.checked) {
      this.getForm.at(index).get('is_random').setValue(true);
    } else {
      this.getForm.at(index).get('is_random').setValue(false);
    }
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

  uploadDialog() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '600px',
      height: '550px',
      data: { title: 'Update', message: 'Update' },
      backdropClass: 'backdropBackground',
    });
  }
}
