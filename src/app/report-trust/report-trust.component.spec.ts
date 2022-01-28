import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTrustComponent } from './report-trust.component';

describe('ReportTrustComponent', () => {
  let component: ReportTrustComponent;
  let fixture: ComponentFixture<ReportTrustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTrustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTrustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
