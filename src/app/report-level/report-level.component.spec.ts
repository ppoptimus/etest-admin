import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLevelComponent } from './report-level.component';

describe('ReportLevelComponent', () => {
  let component: ReportLevelComponent;
  let fixture: ComponentFixture<ReportLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
