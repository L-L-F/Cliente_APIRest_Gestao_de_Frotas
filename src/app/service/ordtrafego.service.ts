import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ordtrafego } from 'src/model/ordtrafego';
import { OrdtrafegoFull } from 'src/model/ordtrafegoFull';

@Injectable({
  providedIn: 'root'
})
export class OrdtrafegoService {

  baseUrl: string = "http://localhost:8080/ordstrafego/"

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getTrajeto(origem: string, destino: string): Observable<any> {
    return this.http.get(this.baseUrl + "/trajeto/" + origem + "/" + destino);
  }

  save(ordtrafego: OrdtrafegoFull): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
    return this.http.post(this.baseUrl, JSON.stringify(ordtrafego), { headers: headers });
  }

  put(ordtrafego: OrdtrafegoFull): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
    return this.http.put(this.baseUrl, JSON.stringify(ordtrafego), { headers: headers });
  }

  delete(ordtrafego: OrdtrafegoFull) {
    return this.http.delete(this.baseUrl + ordtrafego.id);
  }
}

