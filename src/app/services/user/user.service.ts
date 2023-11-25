import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserRequest, IUserResponse } from '../../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'https://demo-api.now.sh/users';

  constructor(private http: HttpClient) {}

  postUser(user: IUserRequest): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(this.url, user);
  }
}
