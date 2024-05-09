import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IdentityService } from '../services/identity.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private identityService: IdentityService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole = this.identityService.getRoles();
    const expectedRoles = route.data['role'];
    const hasExpectedRole = expectedRoles.some((role: any) => userRole.includes(role));
    if(!hasExpectedRole) {
      this.router.navigate(['/pages/home'])
      return false;
    }
    return true;
  }
  
}
