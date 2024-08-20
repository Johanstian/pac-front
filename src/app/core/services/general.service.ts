import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private devUrl = environment.devUrl;
  private proUrl = environment.proUrl;

  constructor(private httpClient: HttpClient) {

  }

  createProduct(request: any):Observable<any> {
    return this.httpClient.post<any>(this.devUrl + this.proUrl + '/general/createProduct', request)
  }

  createEvent(request: any): Observable<any> {
    return this.httpClient.post<any>(this.devUrl + this.proUrl + '/general/createEvent', request);
  }

  createHome(request: any): Observable<any> {
    return this.httpClient.post<any>(this.devUrl + this.proUrl + '/general/createHome', request)
  }

}