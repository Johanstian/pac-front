import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private devUrl = environment.devUrl;
  private proUrl = environment.proUrl;

  constructor(private httpClient: HttpClient) {

  }

  login(request: any):Observable<any> {
    return this.httpClient.post(this.devUrl + this.proUrl + '/loginUser', request)
  }

  public getRoles(): string[] {
    return this.getUser() ? this.getUser().role : [];
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem('token')!);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem('token');
    window.localStorage.setItem('token', JSON.stringify(user));
  }


}