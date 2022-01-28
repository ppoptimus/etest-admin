import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { QuestionInfoDialogComponent } from '../../question-info-dialog/question-info-dialog.component';

@Component({
  selector: 'app-question-log-info',
  templateUrl: './question-log-info.component.html',
  styleUrls: ['./question-log-info.component.scss']
})
export class QuestionLogInfoComponent implements OnInit,AfterViewInit {
  column = ['1','2','3','4','5']
  displayData;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.displayData = new MatTableDataSource(this.data)
    
  }

  ngAfterViewInit(){
    this.displayData.paginator = this.paginator;
  }

  questionInfo(data){
    this.dialog.open(QuestionInfoDialogComponent, {
      panelClass: 'questionDialog',
      width: '100%',
      height: 'auto',
      minHeight: 'calc(100vh - 90px)',
      data
    });
  }

}
