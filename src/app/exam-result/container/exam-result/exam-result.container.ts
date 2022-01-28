import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamineeService } from 'src/app/examinee.service';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.container.html',
  styleUrls: ['./exam-result.container.scss']
})
export class ExamResultContainer implements OnInit {
  examineeList$ = new Observable()
  constructor(
    private examineeSV: ExamineeService
  ) { }

  ngOnInit(): void {
    // this.examineeList$ = this.examineeSV.getAllwithlocationcode()
  }

  onSearch(string){
    if(string){
     return this.examineeList$ = this.examineeSV.getAllwithlocationcode(string)
    }
  }

}
