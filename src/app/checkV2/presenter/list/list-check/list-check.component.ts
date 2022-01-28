import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CoursesService } from 'src/app/courses.service';
@Component({
  selector: 'list-check',
  templateUrl: './list-check.component.html',
  styleUrls: ['./list-check.component.scss'],
})
export class ListCheckComponent implements OnInit {
  column = ['1', '2', '3', '4', '5', '6','7'];
  question = ['1', '2', '3', '4', '5','6','7'];
  @Input() checkList: any = [];
  @Output() onCheck = new EventEmitter();
  @Output() onCheckSuspend = new EventEmitter();
  @Output() onCancelSuspend = new EventEmitter();
  @Output() onCheckChoice = new EventEmitter();
  @Output() onCancelQuestion = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private courseSV: CoursesService
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    // console.log(this.checkList)
    this.checkList = new MatTableDataSource(this.checkList ? this.checkList : []);
    this.checkList.data = this.checkList.data.map((x: any, index) => ({...x , index: index + 1}));
    this.checkList.paginator = this.paginator;
  }

  check() {
    this.onCheck.emit();
  }

  checkSuspend() {
    this.onCheckSuspend.emit();
  }

  cancelSuspend(id){
    this.onCancelSuspend.emit(id);
  }

  checkChoice(){
    this.onCheckChoice.emit();
  }

  cancelQuestion(id){
    this.onCancelQuestion.emit(id)
  }

  useExam(event,data){
    if (event.checked == false){
      this.courseSV.get(data.course_id).subscribe((x: any) => {
        x.is_use = null;
        this.courseSV.update(x.course_id, x).subscribe();
      })
    } else {
      this.courseSV.get(data.course_id).subscribe((x: any) => {
        x.is_use = true;
        this.courseSV.update(x.course_id, x).subscribe();
      })
    }
  }

}
