import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CaseRule, CaseRuleConfig, CaseType } from './case-rule';
import { RuleEditor } from '../rule';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-case-rule',
  standalone: true,
  imports: [FormsModule, RadioButtonModule, CheckboxModule, TranslateModule],
  templateUrl: './case-rule.component.html',
  styleUrl: './case-rule.component.css',
})
export class CaseRuleComponent implements OnInit, RuleEditor {
  @Input() config!: CaseRuleConfig;

  caseTypes: CaseType[] = [
    'Upper',
    'Lower',
    'CapitalizeEvertWord',
    'CapitalizeFirstLetter',
    'Inversion',
    'Random',
  ];

  get rule(): CaseRule {
    return new CaseRule(this.config);
  }

  ngOnInit(): void {
    if (this.config === undefined || this.config === null) {
      this.config = {
        includeExtension: false,
        caseType: 'Lower',
      };
    }
  }
}
