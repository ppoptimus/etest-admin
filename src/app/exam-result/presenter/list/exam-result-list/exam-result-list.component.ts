import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'exam-result-list',
  templateUrl: './exam-result-list.component.html',
  styleUrls: ['./exam-result-list.component.scss']
})
export class ExamResultListComponent implements OnInit,OnChanges {
  column = ['1','2','3','4','5','6','7','8','9']
  @Input() examineeList: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    // console.log(this.examineeList)
    this.examineeList = new MatTableDataSource(this.examineeList ? this.examineeList : []);
    this.examineeList.data = this.examineeList.data.map((x, index) => ({...x, index: index + 1 }));
    this.examineeList.paginator = this.paginator;
  }

}
