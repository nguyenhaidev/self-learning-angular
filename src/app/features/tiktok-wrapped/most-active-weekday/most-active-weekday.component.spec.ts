import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostActiveWeekdayComponent } from './most-active-weekday.component';

describe('MostActiveWeekdayComponent', () => {
  let component: MostActiveWeekdayComponent;
  let fixture: ComponentFixture<MostActiveWeekdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostActiveWeekdayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostActiveWeekdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
