import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Service {
  constructor (private http: Http) {}

  sendDataToDb(user, platform) {
    console.log(user);
    console.log(platform);
    let url;
    if (platform === 'google') {
      url = 'googleAuth';
    } else if (platform === 'facebook') {
      url = 'facebookAuth';
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    this.http.post(url, JSON.stringify(user), requestOptions)
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
