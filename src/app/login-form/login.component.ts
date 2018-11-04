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

  constructor(public http: Http) {
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
          alert('sign in');
          this.googleUser = googleUser;
          this.isSignedIn = this.googleUser.isSignedIn();
          const profile = googleUser.getBasicProfile();

          this.user = Object.assign({}, this.user,
            {id: profile.getId()},
            {name: profile.getName()},
            {imageUrl: profile.getImageUrl()},
            {email: profile.getEmail()});

          this.sendDataToDb(this.user);
        } else {
          alert('sign out');
          this.googleAuth.signOut();
          this.isSignedIn = undefined;
        }
      }, (error) => {});
  }

  // public signOutUser() {
  //   this.googleAuth.signOut();
  //   this.isSignedIn = undefined;
  // }

  private sendDataToDb(user) {
    alert('send values to DB');
    console.log(user);
  }

}
