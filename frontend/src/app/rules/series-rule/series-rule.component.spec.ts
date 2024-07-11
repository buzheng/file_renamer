import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesRuleComponent } from './series-rule.component';

describe('SeriesRuleComponent', () => {
  let component: SeriesRuleComponent;
  let fixture: ComponentFixture<SeriesRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesRuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
