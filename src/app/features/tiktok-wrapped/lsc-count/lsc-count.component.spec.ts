import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LscCountComponent } from './lsc-count.component';

describe('LscCountComponent', () => {
  let component: LscCountComponent;
  let fixture: ComponentFixture<LscCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LscCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LscCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
