import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowPictureComponent } from 'src/app/show-picture/show-picture.component';

@Component({
  selector: 'app-question-info-dialog',
  templateUrl: './question-info-dialog.component.html',
  styleUrls: ['./question-info-dialog.component.scss']
})
export class QuestionInfoDialogComponent implements OnInit {
  questionData;
  status;
  textthai = ['ก', 'ข', 'ค', 'ง', 'จ', 'ฉ', 'ช', 'ซ', 'ฌ', 'ด', 'ต'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  isStatus(){
    if(this.data.is_approve == true){
      return 'อนุมัติ'
    } else if (this.data.is_approve == false){
      return 'ไม่อนุมัติ'
    } else {
      return 'ยังไม่ได้รับการตรวจ'
    }
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

  isRandom(data){
    if(data.is_random == null){
      return 'ไม่สลับ'
    } else {
      return 'สลับ'
    }
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
