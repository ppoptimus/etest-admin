import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDeepDetailComponent } from './question-deep-detail.component';

describe('QuestionDeepDetailComponent', () => {
  let component: QuestionDeepDetailComponent;
  let fixture: ComponentFixture<QuestionDeepDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDeepDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDeepDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
