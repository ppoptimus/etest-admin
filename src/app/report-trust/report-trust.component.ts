import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-trust',
  templateUrl: './report-trust.component.html',
  styleUrls: ['./report-trust.component.scss']
})
export class ReportTrustComponent implements OnInit {
numbers;
question;
tester;
function;
  constructor() {
    this.numbers = Array(50).fill(1).map((x,i)=>i)
    this.question = Array(25).fill(1).map((x,i)=>i)
    this.tester = Array(5).fill(1).map((x,i)=>i)
   }

  ngOnInit(): void {
  }
}
