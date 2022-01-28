import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermSearchComponent } from './perm-search.component';

describe('PermSearchComponent', () => {
  let component: PermSearchComponent;
  let fixture: ComponentFixture<PermSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
