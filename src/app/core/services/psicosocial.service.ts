import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PsicosocialService {

  private devUrl = environment.devUrl;
  private proUrl = environment.proUrl;

  constructor(private httpClient: HttpClient) {

  }

  createPsicosocial(request: any): Observable<any> {
    return this.httpClient.post<any>(this.devUrl + this.proUrl + '/psicosocial/createPostPsicosocial', request);
  }

  getAllPsico():Observable<any> {
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/psicosocial/getAll')
  }

  getAllPsicosocial():Observable<any> {
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/psicosocial/getAllPostpsicosocial')
  }

  updateAllPsicosocial(request: any):Observable<any> {
    return this.httpClient.put<any>(this.devUrl + this.proUrl + '/psicosocial/updateCompetencias/', request)
  }

  getPostpsicosocialById(cc: any): Observable<any> {
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/psicosocial/getPostpsicosocialByCC/' + cc)
  }

  addCompetencesToEnlistment(request: any) {
    return this.httpClient.put<any>(this.devUrl + this.proUrl + '/psicosocial/updateCompetencias', request);
  }

  getExcel():Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = {
      headers: headers,
      responseType: 'blob' as 'json',
    };

    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/psicosocial/exportToExcel', options) as Observable<Blob>;
  }

}
