import { AbstractRule, RuleConfig } from '../rule';

export type WhichNumberToPad =
  | 'First'
  | 'Second'
  | 'Third'
  | 'Fourth'
  | 'Fifth'
  | 'Sixth'
  | 'Seventh'
  | 'Eighth'
  | 'Ninth'
  | 'Tenth'
  | 'Last'
  | 'All';

export interface NumberPaddingConfig extends RuleConfig {
  length: number;
  paddingChar?: string;
  which: WhichNumberToPad;
  isRightPadding?: boolean;
}

export class NumberPaddingRule extends AbstractRule {
  constructor(override config: NumberPaddingConfig) {
    super(config);
  }

  override get name(): string {
    return 'NumberPadding';
  }

  override get description(): string {
    return `Pad numbers with ${this.config.paddingChar} to a length of ${this.config.length}`;
  }

  override get descTranslationKey(): string {
    let subKey = 'default';
    if (this.config.which === 'All') {
      subKey = 'all';
      if (this.config.isRightPadding) {
        subKey = 'allRight';
      }
    } else if (this.config.isRightPadding) {
      subKey = 'right';
    }

    return `desc.${subKey}`;
  }

  override apply(name: string): string {
    let { length: padding, paddingChar, which, isRightPadding } = this.config;
    padding = padding <= 0 ? 1 : padding;
    paddingChar = paddingChar || '0';

    let result = name;

    const regex = /\d+/g;

    if (which === 'All') {
      result = name.replace(regex, match =>
        this.padNumber(+match, padding, paddingChar, isRightPadding),
      );
    } else {
      let matches: RegExpExecArray[] = [];
      let match;
      while ((match = regex.exec(name)) !== null) {
        matches.push(match);
      }

      if (matches.length > 0) {
        const index = which === 'Last' ? matches.length - 1 : this.getIndex(which);
        if (index < matches.length) {
          const match = matches[index];
          const start = match.index;
          const end = start + match[0].length;
          result =
            name.substring(0, start) +
            this.padNumber(+matches[index][0], padding, paddingChar, isRightPadding) +
            name.substring(end);
        }
      }
    }

    return result;
  }

  getIndex(which: string): number {
    switch (which) {
      case 'First':
        return 0;
      case 'Second':
        return 1;
      case 'Third':
        return 2;
      case 'Fourth':
        return 3;
      case 'Fifth':
        return 4;
      case 'Sixth':
        return 5;
      case 'Seventh':
        return 6;
      case 'Eighth':
        return 7;
      case 'Ninth':
        return 8;
      case 'Tenth':
        return 9;
      default:
        return 0;
    }
  }

  private padNumber(
    num: number,
    padding: number,
    paddingChar: string,
    isRightPadding?: boolean,
  ): string {
    let str = num.toString();
    if (str.length >= padding) {
      return str;
    }

    const diff = padding - str.length;
    const pad = paddingChar.repeat(diff);

    return isRightPadding === true ? str + pad : pad + str;
  }
}
