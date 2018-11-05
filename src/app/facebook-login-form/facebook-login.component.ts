import {Component, OnInit} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';

declare const FB: any;

@Component({
  selector: 'app-facebook-login',
  templateUrl: 'facebook-login.component.html',
  styleUrls: ['./facebook-login.component.css']
})

export class FacebookLoginComponent implements OnInit {

  public showSignInButton: boolean;
  public showSignOutButton: boolean;
  public user: any;

  constructor(public http: Http) {
    FB.init({
      appId : '325805861537588',
      cookie : false,
      version : 'v2.5'
    });
  }

  onFacebookLoginClick() {
    FB.login((response: any) => {
      if (response.status === 'connected') {
        this.showSignInButton = false;
        this.showSignOutButton = true;
        this.userData(response.authResponse.userID);
      } else {
        this.showSignInButton = true;
        this.showSignOutButton = false;
        console.log('User not logged in to FB');
      }

    }, {scope: 'user_friends,email'});
  };

  private userData(userId) {
    FB.api('/' + userId + '?fields=id,name,email,gender,picture.width(150).height(150),friends',
      (result) => {
        if (result && !result.error) {
          console.log('data from facebook is ---->  ', result);
          this.user = Object.assign({}, result,
            {id: result.id},
            {name: result.name},
            {imageUrl: result.picture.data.url},
            {email: result.email});

          this.sendDataToDb(this.user);
        }
      });
  }

  onFacebookLogoutClick() {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        FB.logout( () => {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('isFacebook');
          this.showSignInButton = true;
          this.showSignOutButton = false;
        });
      }
    });
  }

  private checkFacebookLoginStatus(response) {
    if (response.status === 'connected') {
      this.showSignInButton = false;
      this.showSignOutButton = true;
      console.log('user is logged in');
    } else {
      this.showSignInButton = true;
      this.showSignOutButton = false;
      console.log('user is logged out');
    }
  };

  ngOnInit() {
    FB.getLoginStatus(response => {
      this.checkFacebookLoginStatus(response);
    });
  }

  private sendDataToDb(user) {
    console.log(user);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

    const requestOptions = new RequestOptions({headers: headers});
    console.log(requestOptions);

    this.http.post('http://localhost:8999/loginservice/v1/facebook', JSON.stringify(user), requestOptions).toPromise()
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
