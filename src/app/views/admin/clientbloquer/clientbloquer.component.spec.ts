import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientbloquerComponent } from './clientbloquer.component';

describe('ClientbloquerComponent', () => {
  let component: ClientbloquerComponent;
  let fixture: ComponentFixture<ClientbloquerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientbloquerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientbloquerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
