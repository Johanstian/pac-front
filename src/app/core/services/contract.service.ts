import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  // private proUrl = environment.proUrl + '/contractor';
  private proUrl = 'http://localhost:3000/api/contractor';

  constructor(private httpClient: HttpClient) {

  }

  createContractor(request: any): Observable<any> {
    return this.httpClient.post<any>(this.proUrl + '/createContractor', request);
  }

  getContractorsPaginated(page: number, limit: number): Observable<any> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    return this.httpClient.get<any>(this.proUrl + '/contractors', { params: params })
  }

  getOneContractor(cc: any): Observable<any> {
    return this.httpClient.get<any>(this.proUrl + '/contractors/' + cc);
  }

  updateContractor(documento: any, request: any): Observable<any> {
    return this.httpClient.put<any>(this.proUrl + '/update-contractor/' + documento, request)
  }

  allContractors(): Observable<any> {
    return this.httpClient.get<any>(this.proUrl + '/all')
  }

  getBySearch(search: any): Observable<any> {
    let params = new HttpParams().set('search', search);
    return this.httpClient.get<any>(this.proUrl + '/search', { params })
  }



}

