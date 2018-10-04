import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOrgComponent } from './menu-org.component';

describe('MenuOrgComponent', () => {
  let component: MenuOrgComponent;
  let fixture: ComponentFixture<MenuOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
