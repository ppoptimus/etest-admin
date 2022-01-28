import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionLogSearchComponent } from './question-log-search.component';

describe('QuestionLogSearchComponent', () => {
  let component: QuestionLogSearchComponent;
  let fixture: ComponentFixture<QuestionLogSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionLogSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionLogSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
