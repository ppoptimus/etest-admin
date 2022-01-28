import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermListComponent } from './perm-list.component';

describe('PermListComponent', () => {
  let component: PermListComponent;
  let fixture: ComponentFixture<PermListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
