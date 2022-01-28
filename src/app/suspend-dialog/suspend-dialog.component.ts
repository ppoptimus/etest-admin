import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionService } from '../question.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-suspend-dialog',
  templateUrl: './suspend-dialog.component.html',
  styleUrls: ['./suspend-dialog.component.scss']
})
export class SuspendDialogComponent implements OnInit {
suspendForm;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private questionService: QuestionService, private formBuilder: FormBuilder ) {
    this.suspendForm = formBuilder.group({
      // course_code: [this.makeid(4), [Validators.required]],
      remark: ['']
    });
   }

  ngOnInit(): void {
  }
suspend(value){
    this.data.question.is_approve = false;
    this.data.question.remark = this.suspendForm.get('remark').value;
    let request = this.data.question;
    this.questionService.update(request.question_id, this.data.question).subscribe(result => {
    });
    // window.location.reload();
}
}
