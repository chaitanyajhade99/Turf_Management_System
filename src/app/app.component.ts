import { Component, HostBinding, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser$: Observable<any | null>;
  isDark$: Observable<boolean>;
  
  @HostBinding('class.theme-dark') isDarkMode = false;

  lottieOptions: AnimationOptions = {
    path: '/assets/animation.json',
  };

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.isDark$ = this.themeService.isDark$;
  }
  
  ngOnInit() {
    this.themeService.isDark$.subscribe(dark => {
      this.isDarkMode = dark;
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout();
  }
}