import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-level',
  templateUrl: './report-level.component.html',
  styleUrls: ['./report-level.component.scss']
})
export class ReportLevelComponent implements OnInit {
  numbers;
  question;
  tester;
  function;
  constructor() {
    this.numbers = Array(28).fill(1).map((x,i)=>i)
    this.question = Array(14).fill(1).map((x,i)=>i)
    this.tester = Array(5).fill(1).map((x,i)=>i)
   }

  ngOnInit(): void {
  }

}
