import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamResultSearchComponent } from './exam-result-search.component';

describe('ExamResultSearchComponent', () => {
  let component: ExamResultSearchComponent;
  let fixture: ComponentFixture<ExamResultSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamResultSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamResultSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
