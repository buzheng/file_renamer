import { Component } from '@angular/core';
import {
  Quit,
  WindowFullscreen,
  WindowIsMaximised,
  WindowMinimise,
  WindowSetAlwaysOnTop,
  WindowToggleMaximise,
  WindowUnfullscreen,
} from '@wailsjs/runtime/runtime';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { delay, of } from 'rxjs';
import { Theme, ThemeService } from '../services/theme.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-title-bar',
  standalone: true,
  imports: [ButtonModule, TooltipModule],
  providers: [ConfirmationService],
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.css',
})
export class TitleBarComponent {
  constructor(private themeService: ThemeService) {}

  isMaximized = false;
  isFullscreen = false;
  isAlwaysOnTop = false;

  get themeIcon() {
    return this.themeService.theme === 'system'
      ? PrimeIcons.PALETTE
      : this.themeService.theme === 'dark'
        ? PrimeIcons.MOON
        : PrimeIcons.SUN;
  }

  get theme(): Theme {
    return this.themeService.theme;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  minimize() {
    WindowMinimise();
  }

  toggleMaximize() {
    WindowToggleMaximise();

    of(this.isMaximized)
      .pipe(delay(200))
      .subscribe(() => {
        WindowIsMaximised().then(maximized => {
          this.isMaximized = maximized;
        });
      });
  }

  quit() {
    Quit();
  }

  fullscreen() {
    this.isFullscreen ? WindowUnfullscreen() : WindowFullscreen();
    this.isFullscreen = !this.isFullscreen;
  }

  setAlwaysOnTop() {
    this.isAlwaysOnTop = !this.isAlwaysOnTop;
    WindowSetAlwaysOnTop(this.isAlwaysOnTop);
  }
}
