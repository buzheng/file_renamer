import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  GetFilesByPickingDirectory,
  GetFilesByPickingFiles,
  RenameFile,
} from '@wailsjs/go/main/App';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Rule } from '../rules/rule';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [TableModule, ButtonModule, TranslateModule],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css',
})
export class FilesComponent implements OnInit, OnChanges {
  files: RenamingFile[] = [];
  selectedFiles: RenamingFile[] = [];

  @Input()
  rules: Rule[] = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rules']) {
      this.calcFileRules();
    }
  }

  get canRename(): boolean {
    return this.rules.length > 0 && this.files.some(file => file.result === 'Pending');
  }

  async pickFolder() {
    const filePaths = await GetFilesByPickingDirectory(false);
    this.addPickedFiles(filePaths);
  }

  async pickFiles() {
    const files = await GetFilesByPickingFiles();
    this.addPickedFiles(files);
  }

  removeSelectedFiles() {
    this.files = this.files.filter(file => !this.selectedFiles.includes(file));
    this.selectedFiles = [];
  }

  async renameFiles() {
    for (const file of this.files) {
      const result = await RenameFile(file.file, file.newFile);
      file.result = result as RenameResult;
    }
  }

  isPending(file: RenamingFile) {
    return file.result === 'Pending';
  }

  isSuccess(file: RenamingFile) {
    return file.result === 'Success';
  }

  isError(file: RenamingFile) {
    return (
      file.result === 'Error' ||
      file.result === 'SrcNotExists' ||
      file.result === 'DestExists' ||
      file.result === 'DestDuplicates'
    );
  }

  private addPickedFiles(pickedFilePaths: string[]) {
    const existFilePaths = this.files.map(file => file.file);
    const uniqueFilePaths = [...new Set([...existFilePaths, ...(pickedFilePaths || [])])];

    this.files = this.calcFiles(uniqueFilePaths);
  }

  private calcFiles(files: string[]): RenamingFile[] {
    const uniqueNewFilePaths = new Set<string>();

    return files.map((file, index) => {
      const { dir, filename, separator } = this.getFileInfo(file);

      const ruleResults = this.calcRuleResults(dir, filename, index);
      const newFilename = this.getNewFilename(ruleResults, filename);
      const newFile = this.getNewFile(newFilename, dir, separator);

      let result: RenameResult;
      if (filename === newFilename) {
        result = 'NoChange';
      } else if (uniqueNewFilePaths.has(newFile)) {
        result = 'DestDuplicates';
      } else {
        result = 'Pending';
      }

      uniqueNewFilePaths.add(newFile);

      return {
        file,
        dir,
        filename,
        separator,
        ruleResults,
        newFilename,
        newFile,
        result,
      };
    });
  }

  private calcFileRules() {
    const uniqueNewFilePaths = new Set<string>();

    this.files.forEach((file, index) => {
      const ruleResults = this.calcRuleResults(file.dir, file.filename, index);
      const newFilename = this.getNewFilename(ruleResults, file.filename);
      const newFilePath = this.getNewFile(newFilename, file.dir, file.separator);

      if (file.filename === newFilename) {
        file.result = 'NoChange';
      } else if (uniqueNewFilePaths.has(newFilePath)) {
        file.result = 'DestDuplicates';
      } else {
        file.result = 'Pending';
      }

      file.ruleResults = ruleResults;
      file.newFilename = newFilename;
      file.newFile = newFilePath;

      uniqueNewFilePaths.add(newFilePath);
    });
  }

  private calcRuleResults(dir: string, filename: string, index: number): string[] {
    return this.rules.reduce<string[]>((results, rule) => {
      const preResult = results.length === 0 ? filename : results[results.length - 1];
      const newFilename = rule.rename({ filename: preResult, dir, index });
      results.push(newFilename);
      return results;
    }, []);
  }

  private getNewFilename(ruleResults: string[], filename: string): string {
    return ruleResults.length > 0 ? ruleResults[ruleResults.length - 1] : filename;
  }

  private getNewFile(newFilename: string, dirPath: string, separator: string): string {
    return `${dirPath}${separator}${newFilename}`;
  }

  private getFileInfo(file: string): { dir: string; filename: string; separator: string } {
    const separator = file.includes('\\') ? '\\' : '/';
    const pathParts = file.split(/[\\/]/);
    const filename = pathParts.pop() || '';
    const dirPath = pathParts.join(separator);
    return { dir: dirPath, filename, separator };
  }
}

type RenameResult =
  | 'Pending'
  | 'Success'
  | 'SrcNotExists'
  | 'DestExists'
  | 'NoChange'
  | 'DestDuplicates'
  | 'Error';

interface RenamingFile {
  file: string;
  dir: string;
  filename: string;
  separator: string;
  newFilename: string;
  newFile: string;
  ruleResults: string[];
  result: RenameResult;
}
