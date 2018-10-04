import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVoluntarioComponent } from './menu-voluntario.component';

describe('MenuVoluntarioComponent', () => {
  let component: MenuVoluntarioComponent;
  let fixture: ComponentFixture<MenuVoluntarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuVoluntarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
