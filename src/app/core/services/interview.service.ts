import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private devUrl = environment.devUrl;
  private proUrl = environment.proUrl;

  constructor(private httpClient: HttpClient) {

  }

  create(request: any):Observable<any> {
    return this.httpClient.post(this.devUrl + this.proUrl + '/interview/createInterview', request);
  }

  getAllInterviews(page: number, limit: number = 5):Observable<any> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/interview/getAllInterviews', {params: params});
  }

  getInterviewsByCC(cc: number):Observable<any> {
    return this.httpClient.get<any>(this.devUrl + this.proUrl + '/tests/getTestByCC/' + cc);
  }


}