import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/candidate.service';
import { BaseForm } from 'src/app/core/base/base-form';
import { QuestionDialogComponent } from 'src/app/question-dialog/question-dialog.component';
import { ResultService } from 'src/app/result.service';

@Component({
  selector: 'app-exam-result-info',
  templateUrl: './exam-result-info.component.html',
  styleUrls: ['./exam-result-info.component.scss']
})
export class ExamResultInfoComponent extends BaseForm implements OnInit {
  data;
  candidateData;
  column = ['1', '2'];
  constructor(
    public route: ActivatedRoute,
    private resultSV: ResultService,
    private candidateSV: CandidateService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    super(route);
   }

  ngOnInit(): void {
    this.resultSV.get(this.id).subscribe(x => {
      this.data = x;
      this.candidateSV.query(`?citizen_id=${this.data.test.citizen_id}`).subscribe(x => {
        this.candidateData = x;
        this.cdr.detectChanges();
      })
    });
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

  back(){
    window.history.back()
  }

}
