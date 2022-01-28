import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportContainer } from './report.container';

describe('ReportContainer', () => {
  let component: ReportContainer;
  let fixture: ComponentFixture<ReportContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
