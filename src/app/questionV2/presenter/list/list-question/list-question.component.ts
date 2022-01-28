import { Component, OnInit, Input, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss']
})
export class ListQuestionComponent implements OnInit, OnChanges {
  column = ['1', '2' , '3' , '4', '5','6']
  @Input() questionList: any = [];
  @Output() getApp = new EventEmitter();
  @Output() getNonApp = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit(): void {}

  ngOnChanges() {
    this.questionList = new MatTableDataSource(this.questionList ? this.questionList : []);
    this.questionList.data = this.questionList.data.map((x, index) => ({...x , index:index+1}))
    this.questionList.paginator = this.paginator;
  }


  questionApprove(){
    this.getApp.emit()
  }

  questionNonApprove(){
    this.getNonApp.emit()
  }

}
