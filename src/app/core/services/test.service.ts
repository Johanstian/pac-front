import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private devUrl = environment.devUrl;
  private proUrl = environment.proUrl;

  constructor(private httpClient: HttpClient) {

  }

  createTest(request: any): Observable<any> {
    return this.httpClient.post<any>(this.devUrl + this.proUrl + '/tests/createTest', request)
  }

  getAllTests(): Observable<any> {
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/tests/getAllTests')
  }

  getGeneralTest(cc: number): Observable<any> {
    // const params = new HttpParams().set('cc', cc);
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/tests/getTestByCC/' + cc)
  }

  createRetest(request: any): Observable<any> {
    return this.httpClient.post<any>(this.devUrl + this.proUrl + '/retests/recreateTest', request)
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/retests/getAll')
  }

  getGeneralRetest(cc: number): Observable<any> {
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/retests/getRetestByCC/' + cc)
  }

  getAllRetests(page: number, limit: number): Observable<any> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/retests/getAllRetests', { params: params });
  }

  getExcel(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = {
      headers: headers,
      responseType: 'blob' as 'json',
    };

    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/retests/exportToExcel', options) as Observable<Blob>;
  }


}