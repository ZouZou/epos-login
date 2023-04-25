import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

export interface BooleanFn {
  (): boolean;
}
/**
 * A conditional validator generator. Assigns a validator to the form control if the predicate function returns true on the moment of validation
 * @example
 * Here if the myCheckbox is set to true, the myEmailField will be required and also the text will have to have the word 'mason' in the end.
 * If it doesn't satisfy these requirements, the errors will placed to the dedicated `illuminatiError` namespace.
 * Also the myEmailField will always have `maxLength`, `minLength` and `pattern` validators.
 * ngOnInit() {
 *   this.myForm = this.fb.group({
 *    myCheckbox: [''],
 *    myEmailField: ['', [
 *       Validators.maxLength(250),
 *       Validators.minLength(5),
 *       Validators.pattern(/.+@.+\..+/),
 *       conditionalValidator(() => this.myForm.get('myCheckbox').value,
 *                            Validators.compose([
 *                            Validators.required,
 *                            Validators.pattern(/.*mason/)
 *         ]),
 *        'accountError')
 *        ]]
 *     })
 * }
 * @param predicate
 * @param validator
 * @param errorNamespace optional argument that creates own namespace for the validation error
 */
export function conditionalValidator(predicate: BooleanFn,
  validator: ValidatorFn,
  errorNamespace?: string): ValidatorFn {
  return (formControl => {
    if (!formControl.parent) {
      return null;
    }
    let error = null;
    if (predicate()) {
      error = validator(formControl);
    }
    if (errorNamespace && error) {
      const customError: any = {};
      customError[errorNamespace] = error;
      error = customError
    }
    return error;
  })
}
@Component({
  selector: 'dq-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      hasquestion: [false, Validators.required],
      oldkey1: ['', conditionalValidator(() => !this.form.get('hasquestion')?.value, Validators.required, 'accountError')],
      oldkey2: ['', conditionalValidator(() => !this.form.get('hasquestion')?.value, Validators.required, 'accountError')],
      oldkey3: ['', conditionalValidator(() => !this.form.get('hasquestion')?.value, Validators.required, 'accountError')],
      oldkey4: ['', conditionalValidator(() => !this.form.get('hasquestion')?.value, Validators.required, 'accountError')],
      newkey1: ['', conditionalValidator(() => !this.form.get('hasquestion')?.value, Validators.required, 'accountError')],
      newkey2: ['', conditionalValidator(() => !this.form.get('hasquestion')?.value, Validators.required, 'accountError')],
      newkey3: ['', conditionalValidator(() => !this.form.get('hasquestion')?.value, Validators.required, 'accountError')],
      newkey4: ['', conditionalValidator(() => !this.form.get('hasquestion')?.value, Validators.required, 'accountError')],
      question: ['', conditionalValidator(() => this.form.get('hasquestion')?.value, Validators.required, 'accountError')],
      answer: ['', conditionalValidator(() => this.form.get('hasquestion')?.value, Validators.required, 'accountError')]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      console.log(this.form.invalid);
      console.log(this.form.get('oldkey1')?.errors);
      return;
    }

    this.loading = true;
    // this.accountService.login(this.f['username'].value, this.f['password'].value)
    //   .pipe(first())
    //   .subscribe({
    //     next: () => {
    //       // get return url from query parameters or default to home page
    //       const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //       this.router.navigateByUrl(returnUrl);
    //     },
    //     error: error => {
    //       // this.alertService.error(error);
    //       this.loading = false;
    //     }
    //   });
  }

  onCancel() {
    this.router.navigate(['/login']);
  }
}
