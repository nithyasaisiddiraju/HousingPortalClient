import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Service {
  result: string = 'From Server: ';

  constructor(private http: HttpClient) { }

  sampleget() {
    this.http.get<any>('https://localhost:7068/api/getName', { responseType: 'json' }).subscribe(
      res => {
        console.log('output: ' + res);
        this.result = this.result + res;
        alert('RES::' + this.result);
      },
      err => console.log('error: ' + err)
    );
  }
}
