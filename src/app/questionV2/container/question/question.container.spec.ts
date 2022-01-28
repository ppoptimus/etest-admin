import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionContainer } from './question.container';

describe('QuestionContainer', () => {
  let component: QuestionContainer;
  let fixture: ComponentFixture<QuestionContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
