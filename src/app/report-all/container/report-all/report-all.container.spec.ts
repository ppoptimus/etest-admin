import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAllContainer } from './report-all.container';

describe('ReportAllContainer', () => {
  let component: ReportAllContainer;
  let fixture: ComponentFixture<ReportAllContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAllContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAllContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
