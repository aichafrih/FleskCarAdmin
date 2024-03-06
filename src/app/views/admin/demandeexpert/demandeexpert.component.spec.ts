import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeexpertComponent } from './demandeexpert.component';

describe('DemandeexpertComponent', () => {
  let component: DemandeexpertComponent;
  let fixture: ComponentFixture<DemandeexpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeexpertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeexpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
