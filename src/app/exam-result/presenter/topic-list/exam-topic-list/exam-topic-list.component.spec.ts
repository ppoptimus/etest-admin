import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTopicListComponent } from './exam-topic-list.component';

describe('ExamTopicListComponent', () => {
  let component: ExamTopicListComponent;
  let fixture: ComponentFixture<ExamTopicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamTopicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamTopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
