import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Login, Register, User } from 'src/types/user.type';
import { environment } from 'src/environments/environment';
import { catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | undefined;

  constructor(private readonly http: HttpClient) { }

  register(user: Register) {
    return this.http.get<User[]>(`${environment.apiUrl}/users?username=${user.username}`).pipe(
      switchMap(existingUsers => {
        if (existingUsers.length > 0) {
          return of({ error: 'Pseudo déja existant' });
        } else {
          return this.http.post<User>(`${environment.apiUrl}/users`, user);
        }
      }),
      catchError(error => of({ error: 'Inscription echoué', details: error }))
    )
  }

  login(user: Login) {
    return this.http.get<User[]>(environment.apiUrl + '/users?username=' + user.username + '&password=' + user.password);
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('user');
  }

  saveUser() {
    localStorage.setItem('user', '' + this.user?.id);
  }

  getSavedUser() {
    return localStorage.getItem('user');
  }

  isUserConnected() {
    if (this.user) {
      this.saveUser();
      return true;
    } else if (this.getSavedUser()) {
      this.getSavedUserInfo()?.subscribe((user) => {
        if(!user) return false;
        this.user = user;
        return true;
      });
    }
    return false;
  }

  private getSavedUserInfo() {
    if(!this.getSavedUser()) return null;
    return this.http.get<User>(environment.apiUrl + '/users/' + this.getSavedUser())
  }
}
