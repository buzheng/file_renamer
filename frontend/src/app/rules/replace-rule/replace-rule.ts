import { AbstractRule, RuleConfig } from '../rule';
export type ReplaceType = 'All' | 'First' | 'Last';

export interface ReplaceConfig extends RuleConfig {
  from: string;
  to: string;
  caseSensitive: boolean;
  isRegex: boolean;
  type: ReplaceType;
}

export class ReplaceRule extends AbstractRule {
  constructor(override config: ReplaceConfig) {
    super(config);
  }

  override apply(name: string): string {
    let newName = name;

    if (this.config.from !== '') {
      switch (this.config.type) {
        case 'All':
          newName = this.replaceAll(name);
          break;
        case 'First':
          newName = this.replaceFirst(name);
          break;
        case 'Last':
          newName = this.replaceLast(name);
          break;
      }
    }

    return newName;
  }

  private escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private replaceAll(str: string): string {
    const flags = this.config.caseSensitive ? 'g' : 'gi';
    const regexStr = this.config.isRegex ? this.config.from : this.escapeRegExp(this.config.from);
    const regex = new RegExp(regexStr, flags);
    return str.replace(regex, this.config.to);
  }

  private replaceFirst(str: string): string {
    const flags = this.config.caseSensitive ? '' : 'i';
    const regexStr = this.config.isRegex ? this.config.from : this.escapeRegExp(this.config.from);
    const regex = new RegExp(regexStr, flags);
    return str.replace(regex, this.config.to);
  }

  private replaceLast(str: string): string {
    const flags = this.config.caseSensitive ? 'g' : 'gi';
    const regexStr = this.config.isRegex ? this.config.from : this.escapeRegExp(this.config.from);
    const regex = new RegExp(regexStr, flags);
    const match = str.match(regex);
    if (match) {
      const lastIndex = str.lastIndexOf(match[match.length - 1]);
      return str.substring(0, lastIndex) + str.substring(lastIndex).replace(regex, this.config.to);
    }
    return str;
  }

  override get name(): string {
    return 'Replace';
  }

  override get description(): string {
    let desc = '';

    switch (this.config.type) {
      case 'All':
        desc = `Replace all ${this.config.from} with ${this.config.to}`;
        break;
      case 'First':
        desc = `Replace first ${this.config.from} with ${this.config.to}`;
        break;
      case 'Last':
        desc = `Replace last ${this.config.from} with ${this.config.to}`;
        break;
    }

    desc += ', Case ' + (this.config.caseSensitive ? 'sensitive' : 'insensitive');

    if (this.config.isRegex) {
      desc += ', Regex';
    }

    return `${desc}, ${super.description}`;
  }

  override get descTranslationKey(): string {
    let subKey = 'default';

    if (this.config.isRegex && this.config.caseSensitive) {
      subKey = 'caseSensitiveAndRegex';
    } else if (this.config.caseSensitive) {
      subKey = 'caseSensitive';
    } else if (this.config.isRegex) {
      subKey = 'regex';
    }

    return `desc.${subKey}`;
  }
}
