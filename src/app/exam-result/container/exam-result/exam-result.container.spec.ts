import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamResultContainer } from './exam-result.container';

describe('ExamResultContainer', () => {
  let component: ExamResultContainer;
  let fixture: ComponentFixture<ExamResultContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamResultContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamResultContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
