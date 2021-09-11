import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo } from 'src/model/veiculo';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  baseUrl: string = "http://localhost:8080/veiculos/"

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getkm(km1: number, km2: number): Observable<any> {
    return this.http.get(this.baseUrl + "/km/" + km1 + "/" + km2);
  }

  save(veiculo: Veiculo): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
    return this.http.post(this.baseUrl, JSON.stringify(veiculo), { headers: headers });
  }

  put(veiculo: Veiculo): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
    return this.http.put(this.baseUrl, JSON.stringify(veiculo), { headers: headers });
  }

  delete(veiculo: Veiculo) {
    return this.http.delete(this.baseUrl + veiculo.id);
  }
}
