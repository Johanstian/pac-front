import { Component } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { IdentityService } from '../core/services/identity.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  menu: any = [];
  showMenu = false;

  constructor(private identityService: IdentityService, private menuService: NbMenuService) {

  }

  ngOnInit(): void {
    const userRoles: any[] = this.identityService.getRoles();
    const isAdmin: any = userRoles.includes('Admin');
    const isTest1: any = userRoles.includes('Test1');
    const isPost1: any = userRoles.includes('Post1');
    const isTest2: any = userRoles.includes('Test2');
    const isPost2: any = userRoles.includes('Post2');
    const isTest3: any = userRoles.includes('Test3');
    const isPost3: any = userRoles.includes('Post3');
    const isTech: any = userRoles.includes('Tech');
    const isAntiguo: any = userRoles.includes('Antiguo');
    this.menuService.addItems(
      [
        {
          title: 'Home',
          link: '/pages/home',
          icon: 'home-outline',
          home: true,
        },
        {
          title: 'Administrativo',
          link: '/pages/management',
          icon: 'checkmark-square-2-outline',
          home: true,
        },
        {
          title: 'Emprende',
          link: '/pages/undertake',
          icon: 'layout-outline',
          hidden: !isAdmin,
        },
        {
          title: 'ARL',
          hidden: !isAdmin && !userRoles.includes('Arlfomento'),
          icon: 'activity-outline',
          children: [
            {
              title: 'Afiliación ARL',
              link: '/pages/arl/arl-affiliation',
              hidden: !isAdmin && !userRoles.includes('Arlfomento'),
            },
            {
              title: 'Listado ARL',
              link: '/pages/arl/arl-list',
              hidden: !isAdmin,
            }
          ]
        },
        {
          title: 'PAC Nuevos',
          icon: 'swap-outline',
          hidden: !isAdmin && !userRoles.includes('Antiguo'),
          children: [
            {
              title: 'Entrevista',
              link: '/pages/enlistment/pre-enlistment-stage',
              hidden: !isAdmin && !userRoles.includes('Antiguo')
            },
            {
              title: 'Psicosocial',
              link: '/pages/enlistment/enlistment-stage',
              hidden: !isAdmin && !userRoles.includes('Antiguo')
            },
            {
              title: 'Fortalecimiento',
              link: '/pages/enlistment/strength',
              hidden: !isAdmin && !userRoles.includes('Antiguo')
            },
            {
              title: 'Técnico',
              link: '/pages/enlistment/induction',
              hidden: !isTech && !isAdmin && !userRoles.includes('Antiguo')
            },
          ],
        },
        {
          title: 'PAC Antiguos',
          icon: 'sync-outline',
          hidden: !isAdmin && !userRoles.includes('Tech') && !userRoles.includes('Antiguo'),
          children: [
            {
              title: 'Listado',
              link: '/pages/follow-up/follow-up-list',
              hidden: !isAdmin && !userRoles.includes('Antiguo')
            },
            {
              title: 'Psicosocial',
              link: '/pages/follow-up/post-psychosocial',
              hidden: !isAdmin && !userRoles.includes('Antiguo')
            },
            {
              title: 'Fortalecimiento',
              link: '/pages/follow-up/post-strength',
              hidden: !isAdmin && !userRoles.includes('Antiguo')
            },
          ],
        },
        {
          title: 'Tests',
          hidden: !isAdmin && !isTest1 && !isTest2 && !isTest3,
          icon: 'layers-outline',
          children: [
            {
              title: 'Test 1',
              link: '/pages/tests/test1',
              hidden: !isAdmin && !userRoles.includes('Test1')
            },
            {
              title: 'Test 2',
              link: '/pages/tests/test2',
              hidden: !isAdmin && !userRoles.includes('Test2')
            },
            {
              title: 'Test 3',
              link: '/pages/tests/test3',
              hidden: !isAdmin && !userRoles.includes('Test3')
            },
          ],
        },
        {
          title: 'Post-Tests',
          hidden: !isAdmin && !isPost1 && !isPost2 && !isPost3,
          icon: 'layers-outline',
          children: [
            {
              title: 'Post-Test 1',
              link: '/pages/retests/retest1',
              hidden: !isAdmin && !userRoles.includes('Post1')
            },
            {
              title: 'Post-Test 2',
              link: '/pages/retests/retest2',
              hidden: !isAdmin && !userRoles.includes('Post2')
            },
            {
              title: 'Post-Test 3',
              link: '/pages/retests/retest3',
              hidden: !isAdmin && !userRoles.includes('Post3')
            },
          ],
        },
        {
          title: 'Resultados',
          icon: 'checkmark-square-2-outline',
          hidden: !userRoles.includes('Admin') && !userRoles.includes('Antiguo'),
          children: [
            {
              title: 'Nuevos',
              link: '/pages/results/individual',
              hidden: !userRoles.includes('Admin') && !userRoles.includes('Antiguo')
            },
            {
              title: 'Antiguos',
              link: '/pages/results/post-individual',
              hidden: !userRoles.includes('Admin') && !userRoles.includes('Antiguo')
            },
            // {
            //   title: 'Globales',
            //   link: '/pages/results/global',
            //   hidden: !userRoles.includes('Admin')
            // },
          ],
        },
      ],
      'menu'
    );
  }


}
