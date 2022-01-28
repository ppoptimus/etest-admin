import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { QuestionDialogComponent } from 'src/app/question-dialog/question-dialog.component';

@Component({
  selector: 'exam-topic-list',
  templateUrl: './exam-topic-list.component.html',
  styleUrls: ['./exam-topic-list.component.scss']
})
export class ExamTopicListComponent implements OnInit,AfterViewInit {
  column = ['1','2']
  @Input() data: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.data = new MatTableDataSource(this.data)
    this.data.paginator = this.paginator
  }


  questionInfo(data){
    this.dialog.open(QuestionDialogComponent, {
      panelClass: 'questionDialog',
      width: '100%',
      height: 'auto',
      minHeight: 'calc(100vh - 90px)',
      data
    });
  }

}
