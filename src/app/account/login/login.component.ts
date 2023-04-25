import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/internal/operators/first';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { isLoadingSelector } from 'src/app/store/selectors';
import { AppStateInterface } from 'src/app/types/appState.interfcase';
import * as UserActions from '../../store/actions';

@Component({
  selector: 'dq-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  isLoading$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      changePassword: [false]
    });
    //this.store.dispatch(UserActions.getUser());
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    //debugger;
    this.submitted = true;

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.store.dispatch(UserActions.loginUser({ userName: this.f['username'].value, password: this.f['password'].value, changePassword: this.f['changePassword'].value }));
  }

  forgotPassword() {
    this.store.dispatch(UserActions.forgotpassword({ userName: this.f['username'].value }));
  }
}
