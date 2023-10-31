import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL } from 'src/app/shared/constants/urls';
import { IUserLogin } from 'src/app/shared/interfaces/IUserLogin';
import { User } from 'src/app/shared/models/User';


const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private api:HttpClient, private toastrService:ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
  }

  logIn(userLogin: IUserLogin):Observable<User>{
   return  this.api.post<User>(USER_LOGIN_URL,userLogin).pipe(
    tap({
      next: (user)=>{
        this.setUSerToLocalStoarge(user);
        this.userSubject.next(user);
        this.toastrService.success(
          `Welcome ${user.name} On my Store`,
          'Loginn Successful'
        )

      },
      error: (errorResponse) =>{
        this.toastrService.error(errorResponse.error,'login Failed')
        
      }
    })
   ) ;
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUSerToLocalStoarge(user:User){

    localStorage.setItem(USER_KEY, JSON.stringify(user));

  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
