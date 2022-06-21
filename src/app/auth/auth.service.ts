import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {tap} from "rxjs/operators";

export interface UsernameAvailableResponse {
  available: boolean
}

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignInCredentials {
  username: string;
  password: string
}

export interface SignupResponse {
  username: string;
}

export interface SignedInResponse {
  username: string;
  authenticated: boolean;
}

export interface SignInResponse {
  username: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rootUrl = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject<boolean | null>(null);

  constructor(private http: HttpClient) { }

  userNameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`, {
      username
    });
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, {
      ... credentials
    }).pipe(
      tap(() => { this.signedIn$.next(true)})
    );
  }

  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.rootUrl}/auth/signedin`).pipe(
      tap(({ authenticated }) => {
        this.signedIn$.next(authenticated);
      })
    );
  }

  signout() {
    return this.http.post<any>(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedIn$.next(false);
      })
    )
  }

  signin(credentials: SignInCredentials) {
    return this.http.post<SignInResponse>(`${this.rootUrl}/auth/signin`, {
      ... credentials
    }).pipe(
      tap(() => { this.signedIn$.next(true)})
    );
  }




}
