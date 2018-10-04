import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolProfileComponent } from './sol-profile.component';

describe('SolProfileComponent', () => {
  let component: SolProfileComponent;
  let fixture: ComponentFixture<SolProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
