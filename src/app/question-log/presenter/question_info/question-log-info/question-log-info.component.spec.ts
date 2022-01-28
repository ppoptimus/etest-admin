import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionLogInfoComponent } from './question-log-info.component';

describe('QuestionLogInfoComponent', () => {
  let component: QuestionLogInfoComponent;
  let fixture: ComponentFixture<QuestionLogInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionLogInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionLogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
