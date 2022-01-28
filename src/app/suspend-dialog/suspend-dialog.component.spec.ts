import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendDialogComponent } from './suspend-dialog.component';

describe('SuspendDialogComponent', () => {
  let component: SuspendDialogComponent;
  let fixture: ComponentFixture<SuspendDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspendDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
