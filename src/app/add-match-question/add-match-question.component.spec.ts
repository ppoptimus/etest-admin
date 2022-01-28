import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatchQuestionComponent } from './add-match-question.component';

describe('AddMatchQuestionComponent', () => {
  let component: AddMatchQuestionComponent;
  let fixture: ComponentFixture<AddMatchQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMatchQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMatchQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
