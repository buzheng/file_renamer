import { Component, OnInit } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { FilesComponent } from './files/files.component';
import { Rule } from './rules/rule';
import { RulesComponent } from './rules/rules.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { ThemeService } from './services/theme.service';
import { IsMac } from '@wailsjs/go/main/App';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SplitterModule, FilesComponent, RulesComponent, TitleBarComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService,
    private languageService: LanguageService,
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(this.languageService.detectLang());
  }

  rules: Rule[] = [];

  isMac = false;

  async ngOnInit() {
    this.themeService.setTheme();
    this.isMac = await IsMac();
  }

  onRulesChanged(rules: Rule[]) {
    this.rules = rules;
  }
}
