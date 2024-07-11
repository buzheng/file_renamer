import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { FilesComponent } from './files/files.component';
import { Rule } from './rules/rule';
import { RulesComponent } from './rules/rules.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SplitterModule, FilesComponent, RulesComponent, TitleBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private themeService: ThemeService) {
    this.themeService.setTheme();
  }

  rules: Rule[] = [];

  onRulesChanged(rules: Rule[]) {
    this.rules = rules;
  }
}
