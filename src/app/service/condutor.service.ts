import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Condutor } from 'src/model/condutor';

@Injectable({
  providedIn: 'root'
})
export class CondutorService {
  
  baseUrl: string = "http://localhost:8080/condutores/"

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  save(condutor: Condutor): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
    return this.http.post(this.baseUrl, JSON.stringify(condutor), { headers: headers });
  }

  put(condutor: Condutor): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
    return this.http.put(this.baseUrl, JSON.stringify(condutor), { headers: headers });
  }

  delete(condutor: Condutor) {
    return this.http.delete(this.baseUrl + condutor.id);
  }
}
