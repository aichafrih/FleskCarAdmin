import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertbloquerComponent } from './expertbloquer.component';

describe('ExpertbloquerComponent', () => {
  let component: ExpertbloquerComponent;
  let fixture: ComponentFixture<ExpertbloquerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertbloquerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertbloquerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
