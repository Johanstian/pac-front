import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnlistmentService {

  private devUrl = environment.devUrl;
  private proUrl = environment.proUrl;

  constructor(private httpClient: HttpClient) {

  }

  create(request: any): Observable<any> {
    return this.httpClient.post<any>(this.devUrl + this.proUrl + '/enlistment/createEnlistment', request);
  }

  getEnlistmentById(cc: any): Observable<any> {
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/enlistment/getEnlistmentByCC/' + cc)
  }

  getAllEnlistment(): Observable<any> {
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/enlistment/getAllEnlistment')
  }

  addTechnicalToEnlistment(request: any) {
    return this.httpClient.put<any>(this.devUrl + this.proUrl + '/enlistment/updateEnlistment', request);
  }


  pdf(cc: any): Observable<Blob> {
    return this.httpClient.get((this.devUrl + this.proUrl + "/enlistment/getEnlistmentInfoAndDownloadPDF/" + cc), { responseType: 'blob' });
  }


}
