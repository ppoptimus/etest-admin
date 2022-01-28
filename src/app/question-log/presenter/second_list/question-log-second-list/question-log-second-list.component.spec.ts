import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionLogSecondListComponent } from './question-log-second-list.component';

describe('QuestionLogSecondListComponent', () => {
  let component: QuestionLogSecondListComponent;
  let fixture: ComponentFixture<QuestionLogSecondListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionLogSecondListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionLogSecondListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
