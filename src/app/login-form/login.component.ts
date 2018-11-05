import {AfterViewInit, Component} from '@angular/core';
import GoogleUser = gapi.auth2.GoogleUser;
import {Http, Response, RequestOptions, Headers} from '@angular/http';

declare const gapi: any;

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit {

  private clientId = '223586481538-i4td2oobb1e3iuv3d3r4r0drcbqtrfk1.apps.googleusercontent.com';

  public googleAuth: any;
  public isSignedIn: boolean;
  public user: any;
  private googleUser: any;

  constructor(private http: Http) {
  }

  ngAfterViewInit() {
    this.loadGoogleAuthLib();
  }

  public loadGoogleAuthLib() {
    gapi.load('auth2', () => {
      this.googleAuth = gapi.auth2.init({
        client_id: this.clientId,
        scope: 'profile email'
      });
      this.getSignedInUser(document.getElementById('googleLoginBtn'));
    });
  }

  public getSignedInUser(element) {
      this.googleAuth.attachClickHandler(element, {}, (googleUser: GoogleUser) => {
        if (this.isSignedIn === undefined) {
          this.googleUser = googleUser;
          this.isSignedIn = this.googleUser.isSignedIn();
          const profile = googleUser.getBasicProfile();

          this.user = Object.assign({}, this.user,
            {id: profile.getId()},
            {name: profile.getName()},
            {imageUrl: profile.getImageUrl()},
            {email: profile.getEmail()});

          alert('Welcome ' + this.user.name);
          this.sendDataToDb(this.user);
        } else {
          this.googleAuth.signOut();
          this.isSignedIn = undefined;
        }
      }, (error) => {});
  }

  private sendDataToDb(user) {
    console.log(user);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

    const requestOptions = new RequestOptions({headers: headers});
    console.log(requestOptions);

    this.http.post('http://localhost:8999/loginservice/v1/google', JSON.stringify(user), requestOptions).toPromise()
      .then((res: Response) => {
      console.log(res);
      if (res.status === 200) {
        console.log('values added to database');
      }
    }).catch((error) => {
      console.log(error.json());
    });

  }

}
