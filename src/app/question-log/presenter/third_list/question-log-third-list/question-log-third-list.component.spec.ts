import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionLogThirdListComponent } from './question-log-third-list.component';

describe('QuestionLogThirdListComponent', () => {
  let component: QuestionLogThirdListComponent;
  let fixture: ComponentFixture<QuestionLogThirdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionLogThirdListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionLogThirdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
