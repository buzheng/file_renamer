import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Rule, RuleEditor } from '../rule';
import { RemoveConfig, RemoveRule, RemoveType, RemoveWhere } from './remove-rule';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-remove-rule',
  standalone: true,
  imports: [FormsModule, CheckboxModule, RadioButtonModule, InputTextModule, TranslateModule],
  templateUrl: './remove-rule.component.html',
  styleUrl: './remove-rule.component.css',
})
export class RemoveRuleComponent implements OnChanges, RuleEditor {
  @Input() config!: RemoveConfig;

  removeTypes: RemoveType[] = [
    'All',
    'Letters',
    'Digits',
    'Alphanumeric',
    'NonAlphanumeric',
    'Uppercase',
    'Lowercase',
    'Whitespace',
    'Punctuation',
    'Brackets',
    'Symbols',
    'CustomCharacters',
    'Text',
  ];

  removeWheres: RemoveWhere[] = ['All', 'Leading', 'Trailing', 'Both'];

  get rule(): Rule {
    return new RemoveRule(this.config);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.config) {
      this.config = {
        includeExtension: false,
        type: 'All',
        where: 'All',
        customCharacters: '',
        text: '',
      };
    }
  }
}
