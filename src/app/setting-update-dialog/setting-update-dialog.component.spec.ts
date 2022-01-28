import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingUpdateDialogComponent } from './setting-update-dialog.component';

describe('SettingUpdateDialogComponent', () => {
  let component: SettingUpdateDialogComponent;
  let fixture: ComponentFixture<SettingUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
