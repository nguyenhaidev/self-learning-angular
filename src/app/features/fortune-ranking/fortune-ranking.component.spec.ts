import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FortuneRankingComponent } from './fortune-ranking.component';

describe('FortuneRankingComponent', () => {
  let component: FortuneRankingComponent;
  let fixture: ComponentFixture<FortuneRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FortuneRankingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FortuneRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
