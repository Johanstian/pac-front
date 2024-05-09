import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService,
} from '@nebular/theme';

import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  companies: any;
  loading: boolean = false;
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
  ];

  currentTheme = 'default';
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  storedUsername: any;
  username: any;
  companyName: any
  selectedCompanyId: any

  notificationCount: any

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private router: Router,
    private dialogService: NbDialogService
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token) {
      const tokenObj = JSON.parse(token)
      if(tokenObj.hasOwnProperty('username')){
        const username = tokenObj.username
        this.storedUsername = username;
      }
    }
    // this.storedUsername = localStorage.getItem('token') || null;
    this.companyName = localStorage.getItem('selectedCompanyName') || null;
    this.selectedCompanyId = localStorage.getItem('selectedCompanyId') || null;
    this.currentTheme = this.themeService.currentTheme;
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange().pipe(map(([, currentBreakpoint]) => currentBreakpoint.width < xl), takeUntil(this.destroy$)).subscribe((isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl));
    this.themeService.onThemeChange().pipe(map(({ name }) => name), takeUntil(this.destroy$)).subscribe((themeName) => (this.currentTheme = themeName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/security/sign-in'])
  }


}
