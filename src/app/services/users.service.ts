import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient, private  authService:AuthService) {}
    apiURLUser: String ='http://localhost:8886/users'
 

}