import { Component, OnInit } from '@angular/core';
import { OccupationGroupService } from '../occupation-group.service';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ReportService } from '../report.service';
import { ExportDialogComponent } from '../export-dialog/export-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SpecialistService } from '../specialist.service';
import { TopicsService } from '../topics.service';
import { QuestionService } from '../question.service';
import { SpecialistScoreService } from '../specialist-score.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {
occupation;
displayDataForm
reportForm;
inputform = true;
numbers;
tableForm;
id;
topicData;
courseData;
questionData;
courseId;
public get getForm(): FormArray {
  return this.reportForm.get('questions') as FormArray;
}
  constructor(
    private dialog: MatDialog ,
    private occupationService: OccupationGroupService,
    private route: ActivatedRoute,
    private questionSV: QuestionService,
    private formBuilder: FormBuilder,
    private topicSV: TopicsService,
    private specialSV: SpecialistService,
    private specialscoreSV: SpecialistScoreService,
    private reportSV: ReportService) {
    this.reportForm = this.formBuilder.group({
      course_id: [''],
      total_question: [''],
      total_test: ['5'],
      questions: this.formBuilder.array([
        this.createchoicesForm(),
        this.createchoicesForm(),
        this.createchoicesForm()
        ]),
    });
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((x:any) => this.id = x.params.id)
    this.occupationService.getAll().subscribe(result => {this.occupation = result; });
  }

  setCourse(event){
    this.occupationService.getCourse(event.source.value).subscribe(x => this.courseData = x)
  }

  setQuestion(event){
    this.questionSV.getid(event.source.value).subscribe(x => {
      this.questionData = x
      this.reportForm.get('total_question').setValue(this.questionData.length)
    })
  }

  setTopic(event){
    this.courseId = event.source.value
    this.topicSV.getid(event.source.value).subscribe(x => {
      this.topicData = x
    })
  }

  input(){
    let spec = []
    this.inputform = false;
    const form = this.reportForm.getRawValue();
    form.questions.map(x => {
      x.course_id = this.courseId;
      this.specialSV.add(x).subscribe(x => {
        spec.push(x)
        this.numbers = Array(form.total_question).fill(1).map((x, i) => i);
        form.questions = form.questions.map((x, i) => ({ question_id: this.questionData[i].question_id, specialist: x.specialist_name }));
        form.questions = this.numbers.map((x, i) => ({ question_id: this.questionData[i].question_id, specialist: [] }));
        form.questions.map( x => x.specialist = spec);
        this.displayDataForm = JSON.parse(JSON.stringify(form));
      })
    })
    
  }

  changeScore(value, questiontIndex, specialistIndex){
    this.displayDataForm.questions[questiontIndex].specialist[specialistIndex].score = +value;

  }

  createchoicesForm(){
    return this.formBuilder.group({
      specialist_name: [null, Validators.required],
      score: null
    });
  }

  addForm(){
    this.getForm.push(this.createchoicesForm());
  }

  remove(index: number){
    this.getForm.removeAt(index);
  }

  result(){
    let form = {...this.displayDataForm};
    // form.questions = form.questions.map(x => x.specialist.map(a => ({...a , question_no: x.question_no + '' })));
    form.questions = form.questions.map(x => x.specialist.map((a,index) => ({...a , question_id: x.question_id})));
    const b = form.questions;
    let mergedarray = b.reduce((a, b) => [...a, ...b]);
    form.questions = mergedarray;
    this.specialscoreSV.add(form.questions).subscribe(x => {
      alert('บันทึกสำเร็จ');
      window.history.back(),
      err => {alert('error')}
    })
    // this.reportSV.validate(form).subscribe();
  }

  export() {
    const dialogRef = this.dialog.open(ExportDialogComponent, {
      width: '700px', height: '245',
      panelClass: 'export',
      data: {title: 'Update' , message: 'Update' },
    });
    dialogRef.afterClosed().subscribe(x => {
      if (x.data === 'excel'){
        window.open('https://e-testing.dsd.go.th/api/question/report/validity/xls/' + this.id);
      }
      if (x.data === 'csv'){
        window.open(`https://e-testing.dsd.go.th/api/question/report/validity/csv/` + this.id);
      }
      if (x.data === 'pdf'){
        window.open(`https://e-testing.dsd.go.th/api/question/report/validity/pdf/` + this.id);
      }
      if (x.data === 'html'){
        window.open(`https://e-testing.dsd.go.th/api/question/report/validity/mht/` + this.id);
      }
    });
  }
}
