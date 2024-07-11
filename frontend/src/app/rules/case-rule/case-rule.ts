import { AbstractRule, RuleConfig } from '../rule';

export type CaseType =
  | 'Upper'
  | 'Lower'
  | 'CapitalizeEvertWord'
  | 'CapitalizeFirstLetter'
  | 'Inversion'
  | 'Random';

export interface CaseRuleConfig extends RuleConfig {
  caseType: CaseType;
}

export class CaseRule extends AbstractRule {
  constructor(override config: CaseRuleConfig) {
    super(config);
  }

  get name(): string {
    return 'Case';
  }

  override get description(): string {
    let caseDesc = '';
    switch (this.config.caseType) {
      case 'Upper':
        caseDesc = 'Upper case';
        break;
      case 'Lower':
        caseDesc = 'Lower case';
        break;
      case 'CapitalizeEvertWord':
        caseDesc = 'Capitalize every word';
        break;
      case 'CapitalizeFirstLetter':
        caseDesc = 'Capitalize first letter';
        break;
      case 'Inversion':
        caseDesc = 'Invert case';
        break;
      case 'Random':
        caseDesc = 'Random case';
        break;
    }

    return `${caseDesc}, ${super.description}`;
  }

  override apply(part: string): string {
    let renamed = part;
    switch (this.config.caseType) {
      case 'Upper':
        renamed = part.toUpperCase();
        break;
      case 'Lower':
        renamed = part.toLowerCase();
        break;
      case 'CapitalizeEvertWord':
        renamed = part
          .split(/(\W+)/)
          .map(word =>
            word.match(/\W+/) ? word : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join('');
        break;
      case 'CapitalizeFirstLetter':
        renamed = part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        break;
      case 'Inversion':
        renamed = part
          .split('')
          .map(char => {
            const isUpper = char === char.toUpperCase();
            return isUpper ? char.toLowerCase() : char.toUpperCase();
          })
          .join('');
        break;
      case 'Random':
        renamed = part
          .split('')
          .map(char => {
            const isUpper = char === char.toUpperCase();
            const isLower = char === char.toLowerCase();
            if (isUpper || isLower) {
              return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
            }
            return char;
          })
          .join('');
        break;
    }

    return renamed;
  }

  override toString(): string {
    return Object.entries(this.config).toString();
  }
}
