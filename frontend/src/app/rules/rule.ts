export interface Rule {
  rename(file: FileInfo): string;

  get config(): RuleConfig;
  get name(): string;
  get description(): string;
}

export interface FileInfo {
  dir: string;
  filename: string;
  index: number;
}

export interface RuleConfig {
  includeExtension: boolean;
}

export abstract class AbstractRule implements Rule {
  constructor(public readonly config: RuleConfig) {}

  abstract apply(name: string, index?: number): string;

  abstract get name(): string;
  // abstract get description(): string;

  get description(): string {
    return this.handleExtensionOnly
      ? 'Extension only'
      : this.config.includeExtension
        ? 'Including extension'
        : 'Excluding extension';
  }

  rename(file: FileInfo): string {
    const { filename, index } = file;
    const { baseName, extension } = this.splitFilename(filename);
    const renamedBaseName = this.apply(baseName, index);
    const renamedExtension = this.config.includeExtension
      ? this.apply(extension, index)
      : extension;

    return renamedBaseName + '.' + renamedExtension;
  }

  protected splitFilename(filename: string): {
    baseName: string;
    extension: string;
  } {
    let baseName = filename;
    let extension = '';

    const dotIndex = filename.lastIndexOf('.');
    if (dotIndex !== -1) {
      baseName = filename.substring(0, dotIndex);
      extension = filename.substring(dotIndex + 1);
    }

    return { baseName, extension };
  }

  get handleExtensionOnly(): boolean {
    return false;
  }
}

export interface RuleEditor {
  get rule(): Rule;
}
