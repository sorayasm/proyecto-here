import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitanteComponent } from './solicitante.component';

describe('SolicitanteComponent', () => {
  let component: SolicitanteComponent;
  let fixture: ComponentFixture<SolicitanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
