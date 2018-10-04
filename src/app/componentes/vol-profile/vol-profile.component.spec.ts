import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolProfileComponent } from './vol-profile.component';

describe('VolProfileComponent', () => {
  let component: VolProfileComponent;
  let fixture: ComponentFixture<VolProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
