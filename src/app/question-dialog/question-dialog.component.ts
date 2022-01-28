import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResultService } from '../result.service';
import { ShowPictureComponent } from '../show-picture/show-picture.component';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialogComponent implements OnInit {
  questionData;
  textthai = ['ก', 'ข', 'ค', 'ง', 'จ', 'ฉ', 'ช', 'ซ', 'ฌ', 'ด', 'ต'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private resultSV: ResultService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.resultSV.getQuestion(this.data.test_id, this.data.test_question_id).subscribe(x => {
      this.questionData = x;
    })
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

  isCorrect(data){
    
    const a = this.questionData.choices.find(x => x.test_choice_id === data.selected_choice_id);
    if (data.correct_choice_id === a.choice_id){
      return true;
    } else {
      return false;
    }
  }

}
