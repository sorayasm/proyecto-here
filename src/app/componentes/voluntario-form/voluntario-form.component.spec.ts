import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntarioFormComponent } from './voluntario-form.component';

describe('VoluntarioFormComponent', () => {
  let component: VoluntarioFormComponent;
  let fixture: ComponentFixture<VoluntarioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluntarioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoluntarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
