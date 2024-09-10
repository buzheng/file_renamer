import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Rule, RuleEditor } from '../rule';
import { NumberPaddingConfig, NumberPaddingRule, WhichNumberToPad } from './number-padding-rule';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-number-padding-rule',
  standalone: true,
  imports: [FormsModule, InputNumberModule, RadioButtonModule, CheckboxModule, TranslateModule],
  templateUrl: './number-padding-rule.component.html',
  styleUrl: './number-padding-rule.component.css',
})
export class NumberPaddingRuleComponent implements OnChanges, RuleEditor {
  @Input() config!: NumberPaddingConfig;

  whichOptions: WhichNumberToPad[] = [
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
    'Sixth',
    'Seventh',
    'Eighth',
    'Ninth',
    'Tenth',
    'Last',
    'All',
  ];

  get rule(): Rule {
    return new NumberPaddingRule(this.config);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      if (!this.config) {
        this.config = {
          includeExtension: false,
          length: 1,
          paddingChar: '0',
          which: 'First',
        };
      }
    }
  }
}
