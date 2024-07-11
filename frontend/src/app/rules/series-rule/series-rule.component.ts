import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Rule, RuleEditor } from '../rule';
import { SeriesConfig, SeriesRule, SeriesWhere } from './series-rule';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'app-series-rule',
  standalone: true,
  imports: [
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    CheckboxModule,
    InputTextModule,
    KeyFilterModule,
  ],
  templateUrl: './series-rule.component.html',
  styleUrl: './series-rule.component.css',
})
export class SeriesRuleComponent implements OnChanges, RuleEditor {
  @Input() config!: SeriesConfig;

  invalidFilenameChars: RegExp = /^[^\\\/:*?"<>|]+$/;

  seriesWheres: SeriesWhere[] = ['Prefix', 'Suffix', 'Position', 'Whole'];

  get rule(): SeriesRule {
    return new SeriesRule(this.config);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      if (!this.config) {
        this.config = {
          includeExtension: false,
          where: 'Prefix',
          position: 0,
          start: 1,
          step: 1,
          repeat: 1,
          padding: 0,
          resetEvery: 0,
          separator: '',
        };
      }
    }
  }
}
