import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbDialogService, NbMediaBreakpointsService, NbMenuItem, NbMenuService, NbSidebarService, NbThemeService,
} from '@nebular/theme';

import { filter, map, takeUntil } from 'rxjs/operators';
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
  items = [
    // { title: 'Mi cuenta', icon: 'people-outline' },
    { title: 'Cerrar sesión', icon: 'power-outline' },
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
    private dialogService: NbDialogService,
    private nbMenuService: NbMenuService,
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenObj = JSON.parse(token)
      if (tokenObj.hasOwnProperty('username')) {
        const username = tokenObj.username
        this.storedUsername = username;
      }
    }
    // this.storedUsername = localStorage.getItem('token') || null;
    this.companyName = localStorage.getItem('selectedCompanyName') || null;
    this.selectedCompanyId = localStorage.getItem('selectedCompanyId') || null;
    this.currentTheme = this.themeService.currentTheme;
    this.nbMenuService.onItemClick()
      .pipe(filter(({ tag }) => tag === 'my-context-menu'), map(({ item }) => item), takeUntil(this.destroy$)).subscribe((menuItem: NbMenuItem) => {
        if (menuItem.title === 'Cerrar sesión') {
          this.logOut();
        }
      });
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
