import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArlService {

  private devUrl = environment.devUrl;
  private proUrl = environment.proUrl;

  constructor(private httpClient: HttpClient) {

  }

  createArl(request: any): Observable<any> {
    return this.httpClient.post<any>(this.devUrl + this.proUrl + '/arl/createArl', request);
  }

  getAllArls(page: number, limit: number): Observable<any> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/arl/getAllArls', {params: params});
  }

  getArlByCc(cc: any): Observable<any> {
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/arl/getArlByCc/' + cc);
  }

  getExcel():Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = {
      headers: headers,
      responseType: 'blob' as 'json',
    };

    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/arl/exportToExcel', options) as Observable<Blob>;
  }


}
