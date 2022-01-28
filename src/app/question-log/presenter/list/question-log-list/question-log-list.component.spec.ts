import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionLogListComponent } from './question-log-list.component';

describe('QuestionLogListComponent', () => {
  let component: QuestionLogListComponent;
  let fixture: ComponentFixture<QuestionLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionLogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
