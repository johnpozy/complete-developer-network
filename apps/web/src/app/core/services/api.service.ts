import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ApiServiceConfig {
  baseApiUrl: String;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers: HttpHeaders;

  private baseApiUrl;

  constructor(@Optional() config: ApiServiceConfig, private http: HttpClient) {
    if (config) {
      this.baseApiUrl = config.baseApiUrl;
    }
  }

  public post(path, payload): Observable<HttpResponse<any>> {
    return this.http
      .post(`${this.baseApiUrl}/${path}`, payload, {
        headers: this.headers,
        observe: 'response'
      })
      .pipe(map(response => response));
  }

  public put(path, payload): Observable<HttpResponse<any>> {
    return this.http
      .put(`${this.baseApiUrl}/${path}`, payload, {
        headers: this.headers,
        observe: 'response'
      })
      .pipe(map(response => response));
  }

  public delete(path): Observable<HttpResponse<any>> {
    return this.http
      .delete(`${this.baseApiUrl}/${path}`, {
        headers: this.headers,
        observe: 'response'
      })
      .pipe(map(response => response));
  }

  public get(path): Observable<HttpResponse<any>> {
    return this.http
      .get(`${this.baseApiUrl}/${path}`, {
        headers: this.headers,
        observe: 'response'
      })
      .pipe(map(response => response));
  }
}
