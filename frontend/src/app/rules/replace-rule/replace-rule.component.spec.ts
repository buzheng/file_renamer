import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceRuleComponent } from './replace-rule.component';

describe('ReplaceRuleComponent', () => {
  let component: ReplaceRuleComponent;
  let fixture: ComponentFixture<ReplaceRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplaceRuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplaceRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
