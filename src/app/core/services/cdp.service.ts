import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CdpService {

  // private proUrl = environment.proUrl;
  private proUrl = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {

  }

  createCdp(request: any): Observable<any> {
    return this.httpClient.post<any>(this.proUrl + '/cdp/create', request);
  }

  getCdpPaginated(page: number, limit: number): Observable<any> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    return this.httpClient.get<any>(this.proUrl + '/cdp/paginated', { params: params });
  }

  getAllCdps() {
    return this.httpClient.get<any>(this.proUrl + '/cdp/all');
  }

  getCdpByDocumentp(id: any): Observable<any>  {
    return this.httpClient.get<any>(this.proUrl + '/cdp/get-cdp/' + id)
  }

  updateCdp(id: any, request: any): Observable<any> {
    return this.httpClient.put<any>(this.proUrl + '/cdp/update/' + id, request)
  }

  getBySearch(search: any) {
    let params = new HttpParams().set('search', search)
     if (search.trim()) {
      params = params.set('search', search);
    }
    return this.httpClient.get<any>(this.proUrl + '/cdp/search', { params })
  }


}
