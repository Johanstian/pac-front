import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private devUrl = environment.devUrl + '/contractor';
  private proUrl = environment.proUrl + '/contractor';

  // private apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {

  }

  createContractor(request: any): Observable<any> {
    return this.httpClient.post<any>(this.devUrl + this.proUrl + '/createContractor', request);
  }

  getContractorsPaginated(page: number, limit: number): Observable<any> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/contractors', { params: params })
  }

  getOneContractor(cc: any): Observable<any> {
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/contractors/' + cc);
  }

  updateContractor(documento: any, request: any): Observable<any> {
    return this.httpClient.put<any>(this.devUrl + this.proUrl + '/update-contractor/' + documento, request)
  }

  allContractors(): Observable<any> {
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/all')
  }

  getBySearch(search: any): Observable<any> {
    let params = new HttpParams().set('search', search);
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/search', { params })
  }



}

