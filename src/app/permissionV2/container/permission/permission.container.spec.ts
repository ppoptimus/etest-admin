import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionContainer } from './permission.container';

describe('PermissionContainer', () => {
  let component: PermissionContainer;
  let fixture: ComponentFixture<PermissionContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
