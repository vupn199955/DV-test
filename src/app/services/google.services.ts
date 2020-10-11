import { BehaviorSubject, Observable, Observer, of, Subject } from 'rxjs';
// Document Google Auth2 https://developers.google.com/identity/sign-in/web/reference#top_of_page
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { debounce, delay, map, switchMap } from 'rxjs/operators';

declare var gapi: any;
export class SocialUser {
  provider: string;
  id: string;
  email: string;
  name: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  authToken: string;
  idToken: string;
  authorizationCode: string;
  response: any;
  age: any;
  gender: string;
}

@Injectable({
  providedIn: 'root',
})
export class GoogleAuth2Service {
  auth2;
  client;
  isInitialized = new BehaviorSubject(false);
  constructor(
    private cookieService: CookieService,
  ) { }

  loadScript(id, src, onload, parentElement?): void {
    if (parentElement === void 0) { parentElement = null; }
    // get document if platform is only browser
    if (typeof document !== 'undefined' && !document.getElementById(id)) {
        const signInJS = document.createElement('script');
        signInJS.setAttribute('id', id);
        signInJS.async = true;
        signInJS.src = src;
        signInJS.onload = onload;
        if (!parentElement) {
            parentElement = document.head;
        }
        parentElement.appendChild(signInJS);
    }
  }

  initialize(clientId, initOptions?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadScript('GOOGLE', 'https://apis.google.com/js/platform.js', () => {
        gapi.load('client:auth2', () => {
          this.auth2 = gapi.auth2.init(Object.assign(Object.assign({}, initOptions), { client_id: clientId }));
          this.auth2.then(() => {
            this.isInitialized.next(true);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
        });
      });
    });
  }

  getLoginStatus(): any {
    if (this.auth2 && this.auth2.isSignedIn.get()) {
      const user = new SocialUser();
      const profile = this.auth2.currentUser.get().getBasicProfile();
      const token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
      const backendToken = this.auth2.currentUser.get().getAuthResponse(true).id_token;
      user.id = profile.getId();
      user.name = profile.getName();
      user.email = profile.getEmail();
      user.photoUrl = profile.getImageUrl();
      user.firstName = profile.getGivenName();
      user.lastName = profile.getFamilyName();
      user.authToken = token;
      user.idToken = backendToken;
      user.response = profile;
      return user;
    }
    return false;
  }

  async signOut(revoke?: boolean): Promise<any> {
    try {
      let signOutPromise;
      if (revoke) {
        signOutPromise = this.auth2.disconnect();
      }
      else {
        signOutPromise = this.auth2.signOut();
      }
      const err = await signOutPromise;
      if (err) {
        return Promise.reject(err);
      }
      return;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  storeAccessToken(accessKey, refreshKey): void {
    this.cookieService.set('dv_access_key', accessKey, 3600000);
    this.cookieService.set('dv_refresh_key', refreshKey);
  }

  async getUserMetadata(): Promise<any> {
    const calculateAge = (birthday) => { // birthday is a date
      const ageDifMs = Date.now() - birthday;
      const ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };
    try {
      await gapi.client.load('people');
      const res =  await gapi.client.people.people.get({
        resourceName: 'people/me',
        personFields: 'genders,birthdays'
      });
      if (!res) { return Promise.reject(); }
      const bodyData = JSON.parse(res.body);
      const gender = bodyData.genders.filter(({ metadata }) => (metadata.source.type === 'PROFILE'))[0].formattedValue;
      const birthdayData = bodyData.birthdays.filter(({ metadata }) => (metadata.source.type === 'ACCOUNT'))[0].date;
      const birthday = new Date(birthdayData.year, birthdayData.month, birthdayData.day);
      const age = calculateAge(birthday);
      return {
        gender,
        age
      };
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async signIn(signInOptions: any = { scope: 'email profile openid https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/profile.agerange.read', response_type: 'id_token permission' }): Promise<any> {
    try {
      const options = signInOptions;
      const offlineAccess = options && options.offline_access;
      const promise = !offlineAccess
          ? this.auth2.signIn(signInOptions)
          : this.auth2.grantOfflineAccess(signInOptions);
      const response = await promise;
      const user = new SocialUser();
      const metadata = await this.getUserMetadata();
      if (response && response.code) {
          user.authorizationCode = response.code;
      } else {
        const profile = this.auth2.currentUser.get().getBasicProfile();
        const token = this.auth2.currentUser.get().getAuthResponse(true)
            .access_token;
        const backendToken = this.auth2.currentUser
            .get()
            .getAuthResponse(true).id_token;
        this.storeAccessToken(token, backendToken);
        user.id = profile.getId();
        user.name = profile.getName();
        user.email = profile.getEmail();
        user.photoUrl = profile.getImageUrl();
        user.firstName = profile.getGivenName();
        user.lastName = profile.getFamilyName();
        user.authToken = token;
        user.idToken = backendToken;
        user.response = profile;
        user.age = metadata.age;
        user.gender = metadata.gender;
      }
      return user;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}
