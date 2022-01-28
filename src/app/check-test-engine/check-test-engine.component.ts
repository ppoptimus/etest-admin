import { MatSnackBar } from '@angular/material/snack-bar';
import { DrawerService } from './../drawer.service';
import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicsService } from '../topics.service';
import { QuestionService } from '../question.service';
import { QuestioncheckService } from '../questioncheck.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { concatMap, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { SuspendDialogComponent } from '../suspend-dialog/suspend-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ChoiceService } from '../choice.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { UploadService } from '../upload.service';
import { ShowPictureComponent } from '../show-picture/show-picture.component';
import { ThrowStmt } from '@angular/compiler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-test-engine',
  templateUrl: './check-test-engine.component.html',
  styleUrls: ['./check-test-engine.component.scss'],
})
export class CheckTestEngineComponent implements OnInit {
  @ViewChild('drawer', { static: false }) public drawer: MatDrawer;
  topic;
  question;
  tinymceInit;
  questionid;
  form: FormGroup;
  table;
  next;
  resData : boolean = false;
  edit = 'no';
  questiondata;
  choiceMatch;
  displayMatch;
  leftquestion = [{ match_question_name: '' }];
  leftColumns: string[] = ['1', '2','3','4'];
  column = ['1', '2', '3', '4'];
  textthai = ['ก', 'ข', 'ค', 'ง', 'จ', 'ฉ', 'ช', 'ซ', 'ฌ', 'ด', 'ต'];
  displayedColumns: string[] = ['id', 'name', 'answer', 'random', 'delete'];
  public get getForm(): FormArray {
    return this.form.get('choices') as FormArray;
  }

  public get getLeftForm(): FormArray {
    return this.form.get('question_matches') as FormArray;
  }
  button = 'yes';
  private unSubAll$ = new Subject<boolean>();
  constructor(
    private route: ActivatedRoute,
    private topicsService: TopicsService,
    private questionService: QuestionService,
    private questioncheckService: QuestioncheckService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private choiceService: ChoiceService,
    private drawerSV: DrawerService,
    private sb: MatSnackBar,
    private uploadSV: UploadService,
    private cdr: ChangeDetectorRef
  ) {
    this.choiceMatch = Array(50)
      .fill(1)
      .map((x, i) => i + 1);
    this.form = this.formBuilder.group({
      question_id: [''],
      topic_id: [''],
      question_no: [''],
      question_name: [''],
      is_approve: [null],
      is_match: [null],
      match_question_name: [''],
      question_matches: this.formBuilder.array([]),
      choices: this.formBuilder.array([]),
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
      relative_urls: false,
      remove_script_host: true,
      forced_root_block: false,
      force_br_newlines: true,
      force_p_newlines: false,
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
              if(x.status == 'success')
              cb(x.message[0].file_name)
            });
          reader.readAsDataURL(file);
        }
        input.click();
      },
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((result: any) => {
      let id = result.params.topicsTopic_id
      this.topicsService
        .query(`/${id}`)
        .subscribe((a) => {
          this.unSubAll$.next(true);
          this.topic = a;
        });
      this.questionService
        .getid(id)
        .subscribe((a) => {
          this.unSubAll$.next(true);
          this.question = a;
        });
      this.questioncheckService
        .get(`start/${id}`)
        .subscribe((a) => {
          this.unSubAll$.next(true);
          this.questionid = a
        });
    });
  }

  updatequestion() {
    this.route.paramMap.subscribe((result: any) => {
      this.questionService
        .getid(result.params.topicsTopic_id)
        .subscribe((a) => {
          this.unSubAll$.next(true);
          this.question = a;
        });
    });
  }

  nextquestion() {
    this.questioncheckService.next(this.questionid).subscribe((result) => {
      this.unSubAll$.next(true);
      this.questionid = result;
      this.updatequestion()
      this.cdr.detectChanges()
      this.edit = 'no';
    });
  }

  goto(no){
    this.questioncheckService.goto(this.questionid,no).subscribe(x => {
      this.unSubAll$.next(true);
      console.log(no)
      console.log(x)
      this.questionid = x;
      this.updatequestion()
      this.cdr.detectChanges()
      this.edit = 'no';
    })
  }

  setUpForm(res) {
    this.form.patchValue(res)
    this.getForm.clear();
    this.getLeftForm.clear();
    res.question_matches.map(x => this.getLeftForm.push(this._createMatchChoice(x)));
    res.choices.map(x => this.getForm.push(this._createFormChoices(x)));
    this.form.get('choices').valueChanges.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      tap((result) => {(this.table = result); }),
      tap(x => this.unSubAll$.next(true))).subscribe();
    this.form.get('question_matches').valueChanges.pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        tap((result) => (this.displayMatch = result)),
        tap(x => this.unSubAll$.next(true))).subscribe();
    this.edit = 'yes';
  }

  private _createFormChoices(choice) {
    return this.formBuilder.group({
      choice_id: [choice.choice_id],
      question_id: [choice.question_id],
      choice_name: [choice.choice_name],
      is_correct: [choice.is_correct],
      is_random: [choice.is_random],
    });
  }

  prevquestion() {
    this.questioncheckService.prev(this.questionid).subscribe((result) => {
      this.unSubAll$.next(true);
      this.questionid = result;
      this.updatequestion()
      this.cdr.detectChanges()
      this.edit = 'no';
    });
  }

  endquestion() {
    this.questioncheckService.end(this.questionid).subscribe((result) => {
      this.unSubAll$.next(true);
    });
  }

  confirm() {
    this.questionid.question.is_approve = true;
    let request = this.questionid.question;
    this.questionService
      .update(request.question_id, this.questionid.question)
      .subscribe(() => {
        this.unSubAll$.next(true);
        this.sb.open('ยืนยันคำถามเรียบร้อยแล้ว', '', {duration: 1000})
        this.updatequestion();
        this.nextquestion()
        this.cdr.detectChanges()
      });
  }

  suspend() {
    const dialogRef = this.dialog.open(SuspendDialogComponent, {
      width: '500px',
      height: '300px',
      data: {
        title: 'Update',
        message: 'Update',
        question: this.questionid.question,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.unSubAll$.next(true);
      this.updatequestion();
    });
    this.edit = 'no';
  }

  update() {
    let request = this.form.getRawValue();
    this.questionService
      .update(request.question_id, request)
      .subscribe(x => {
        this.success('อัพเดทสำเร็จ');
        this.goto(this.questionid.question.question_no);
        this.updatequestion();
        this.edit = 'no';
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

  editquestion() {
    // this.edit = 'yes';
    this.questionid.question.is_approve = null;
    let request = this.questionid.question;
    this.questionService.update(request.question_id, this.questionid.question).subscribe(() => {
        this.unSubAll$.next(true);
      });
    this.questionService.get(request.question_id).pipe(
      tap(x => this.questiondata = x),
      tap(x => this.setUpForm(x))
      ).subscribe();
    // this.setUpForm()
  }

  createchoicesForm() {
    return this.formBuilder.group({
      choice_id: [null],
      question_id: [this.questionid.question.question_id],
      choice_name: [''],
      is_correct: [false],
      is_random: [false],
    });
  }
  addForm() {
    this.getForm.push(this.createchoicesForm());
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
    if (checked.checked) {
      this.getForm.at(index).get('is_random').setValue(true);
    } else {
      this.getForm.at(index).get('is_random').setValue(false);
    }
  }
  cancel() {
    this.edit = 'no';
  }

  remove(index: number) {
    let form = this.form.get('choices') as FormArray;
    form.removeAt(index);
  }

  deletechoice(id) {
    this.table.choice_id = id;
    this.choiceService.deleteDate(id).subscribe(() => {
      this.unSubAll$.next(true);
    });
  }

  toggle() {
    this.drawerSV.toggle();
  } 

  showPicture(data){
    const dialogRef = this.dialog.open(ShowPictureComponent, {
      data: {
        title: 'Update',
        message: 'Update',
        pic: data
      },
    });
  }

  removeChoice(index: number){
    this.getLeftForm.removeAt(index)
  }

  leftChange(index,event){
    this.getLeftForm.at(index).get('correct_choice_id').setValue(event.value);
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

  saveQuestion(){
    const form = this.form.getRawValue()
    this.questionService.update(form.question_id, form).subscribe(x => {
      this.route.paramMap.subscribe((result: any) => {
        this.questionService
          .query(`/${form.question_id}`)
          .subscribe((a) => {
            this.getForm.clear()
            this.getLeftForm.clear()
            this.setUpForm(a);
            this.resData = true;
          });
      });
    })
  }
}
