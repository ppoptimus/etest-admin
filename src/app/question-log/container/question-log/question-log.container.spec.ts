import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionLogContainer } from './question-log.container';

describe('QuestionLogContainer', () => {
  let component: QuestionLogContainer;
  let fixture: ComponentFixture<QuestionLogContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionLogContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionLogContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
