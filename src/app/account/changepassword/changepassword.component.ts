import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { AccountService } from 'src/app/services/account.service';
import { MatPasswordStrengthComponent } from "@angular-material-extensions/password-strength";

@Component({
  selector: 'dq-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;
  inputType = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    debugger;
    this.submitted = true;

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          // this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);
  }

  onCancel() {
    this.router.navigate(['/login']);
  }  
}

