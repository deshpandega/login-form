import {Component, OnInit} from '@angular/core';

declare const FB: any;

@Component({
  selector: 'app-facebook-login',
  templateUrl: 'facebook-login.component.html',
  styleUrls: ['./facebook-login.component.css']
})

export class FacebookLoginComponent implements OnInit {

  public showSignInButton: boolean;
  public showSignOutButton: boolean;

  constructor() {
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
}