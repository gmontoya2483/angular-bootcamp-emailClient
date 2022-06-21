import {AbstractControl, AsyncValidator } from "@angular/forms";
import {Injectable} from "@angular/core";
import {of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {AuthService} from "../auth.service";

@Injectable({ providedIn: 'root' })
export class UniqueUserName implements AsyncValidator{

  constructor(private authService: AuthService) {}

  validate = (control: AbstractControl) => {
    const { value } = control;
    return this.authService.userNameAvailable(value).pipe(
      map(() => {
          return null
      }),
      catchError((err) => {
        if(err.error.username) {
          return of({nonUniqueUsername: true});
        }
        return of ({ error: 'Something went wrong'})
      })
    );
  }


}
