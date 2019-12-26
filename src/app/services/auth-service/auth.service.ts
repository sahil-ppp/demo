import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  enroll(data): Observable<any> {
    const env = environment;

  let signupdetails = {
    email: data.username,
    lastname: data.lastName,
    password: data.password,
    firstName: data.firstName,
    roleType:data.role,
    inviteby:data.inviteby,
    invitetype:data.invitetype,
    invitecompanyid:data.invitecompanyid,
    inviteuserid:data.inviteuserid      
    };
  
    if (signupdetails.invitecompanyid == null || signupdetails.invitecompanyid == undefined)
    {
      delete signupdetails.invitecompanyid;
      delete signupdetails.invitetype;
      delete signupdetails.inviteuserid;
      delete signupdetails.inviteby;
    }

    return this.http.post<any>('users', signupdetails);
  }

  login(data): Observable<any> {
    const env = environment;
    return this.http.post<any>('users/login', {
      email: data.username,
      password: data.password,
    });
  }
}
