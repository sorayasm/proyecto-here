import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSolicitanteComponent } from './menu-solicitante.component';

describe('MenuSolicitanteComponent', () => {
  let component: MenuSolicitanteComponent;
  let fixture: ComponentFixture<MenuSolicitanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSolicitanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
