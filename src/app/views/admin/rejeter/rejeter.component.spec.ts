import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejeterComponent } from './rejeter.component';

describe('RejeterComponent', () => {
  let component: RejeterComponent;
  let fixture: ComponentFixture<RejeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejeterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
