import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamResultInfoComponent } from './exam-result-info.component';

describe('ExamResultInfoComponent', () => {
  let component: ExamResultInfoComponent;
  let fixture: ComponentFixture<ExamResultInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamResultInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamResultInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
