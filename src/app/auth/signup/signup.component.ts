import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatchPassword} from "../validators/match-password";
import {UniqueUserName} from "../validators/unique-user-name";
import {AuthService} from "../auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], [
      this.uniqueUserName.validate
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])

  }, { validators: [this.matchPassword.validate]});

  constructor(private matchPassword: MatchPassword,
              private uniqueUserName: UniqueUserName,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.authForm.invalid ) return;

    this.authService.signup(this.authForm.value)
      .subscribe({
        next:(response) => {
          // Navigate to some other route
          this.router.navigateByUrl('/inbox').then();
        },
        complete:() => {},
        error: (err: HttpErrorResponse) => {
          if(!err.status) {
            this.authForm.setErrors({ noConnection: true });
          } else {
            this.authForm.setErrors({unknownError: true});
          }
        }
      });
  }
}
