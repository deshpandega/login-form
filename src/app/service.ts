import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Service {
  constructor (
    private http: Http
  ) {}

  sendDataToDb(user) {
    console.log(user);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});
    console.log(requestOptions);

    this.http.post('/facebookAuth', JSON.stringify(user), requestOptions)
      .toPromise()
      .then((res: Response) => {
        console.log(res);
        if (res.status === 200) {
          console.log('values added to database');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
