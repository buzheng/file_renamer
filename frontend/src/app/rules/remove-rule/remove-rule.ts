import { AbstractRule, RuleConfig } from '../rule';

export type RemoveType =
  | 'All'
  | 'Letters'
  | 'Digits'
  | 'Alphanumeric'
  | 'NonAlphanumeric'
  | 'Uppercase'
  | 'Lowercase'
  | 'Whitespace'
  | 'Punctuation'
  | 'Brackets'
  | 'Symbols'
  | 'CustomCharacters'
  | 'Text';

export type RemoveWhere = 'All' | 'Leading' | 'Trailing' | 'Both';

export interface RemoveConfig extends RuleConfig {
  type: RemoveType;
  where: RemoveWhere;
  customCharacters: string;
  text: string;
}

export class RemoveRule extends AbstractRule {
  constructor(override config: RemoveConfig) {
    super(config);
  }

  override get name(): string {
    return 'Remove';
  }

  override get description(): string {
    let desc = '';

    switch (this.config.type) {
      case 'All':
        desc = 'all characters';
        break;
      case 'Letters':
        desc = 'letters';
        break;
      case 'Digits':
        desc = 'digits';
        break;
      case 'Alphanumeric':
        desc = 'alphanumerics';
        break;
      case 'NonAlphanumeric':
        desc = 'non-alphanumerics';
        break;
      case 'Uppercase':
        desc = 'uppercase letters';
        break;
      case 'Lowercase':
        desc = 'lowercase letters';
        break;
      case 'Whitespace':
        desc = 'whitespace';
        break;
      case 'Punctuation':
        desc = 'punctuation';
        break;
      case 'Brackets':
        desc = 'brackets';
        break;
      case 'Symbols':
        desc = 'symbols';
        break;
      case 'CustomCharacters':
        desc = `custom: ${this.config.customCharacters}`;
        break;
      case 'Text':
        desc = `text: ${this.config.text}`;
        break;
    }

    let where = '';
    if (this.config.type !== 'All') {
      switch (this.config.where) {
        case 'All':
          where = 'all';
          break;
        case 'Leading':
          where = 'leading';
          break;
        case 'Trailing':
          where = 'trailing';
          break;
        case 'Both':
          where = 'leading and trailing';
          break;
      }
    }

    desc = `Remove ${where} ${desc}`;

    return `${desc}, ${super.description}`;
  }

  override get descTranslationKey(): string {
    return `desc.${this.config.where}.${this.config.type}`;
  }

  override apply(name: string): string {
    switch (this.config.type) {
      case 'All':
        return '';
      case 'Letters':
        return this.removeByRegex(name, '[a-zA-Z]');
      case 'Digits':
        return this.removeByRegex(name, '\\d');
      case 'Alphanumeric':
        return this.removeByRegex(name, '[a-zA-Z0-9]');
      case 'NonAlphanumeric':
        return this.removeByRegex(name, '[^a-zA-Z0-9]');
      case 'Uppercase':
        return this.removeByRegex(name, '[A-Z]');
      case 'Lowercase':
        return this.removeByRegex(name, '[a-z]');
      case 'Whitespace':
        return this.removeByRegex(name, '\\s');
      case 'Punctuation':
        return this.removeByRegex(name, '[\\p{P}]');
      case 'Brackets':
        return this.removeByRegex(name, '[\\[\\](){}<>]');
      case 'Symbols':
        return this.removeByRegex(name, '[\\p{S}]');
      case 'CustomCharacters':
        return this.removeByRegex(name, `[${this.config.customCharacters}]`);
      case 'Text':
        return this.removeByRegex(name, this.config.text);
      default:
        return name;
    }
  }

  private removeByRegex(name: string, regex: string): string {
    switch (this.config.where) {
      case 'All':
        return name.replace(new RegExp(regex, 'g'), '');
      case 'Leading':
        return name.replace(new RegExp(`^${regex}`, 'g'), '');
      case 'Trailing':
        return name.replace(new RegExp(`${regex}$`, 'g'), '');
      case 'Both':
        return name.replace(new RegExp(`^${regex}|${regex}$`, 'g'), '');
      default:
        return name;
    }
  }
}
