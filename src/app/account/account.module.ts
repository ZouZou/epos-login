import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { reducers } from "../store/reducers";
import { ChangepasswordComponent } from "./changepassword/changepassword.component";
import { LoginComponent } from "./login/login.component";
import {
    faUser,
    faLock
  } from '@fortawesome/free-solid-svg-icons';
import { UserEffects } from "../store/effects";
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SwitchagentComponent } from './switchagent/switchagent.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        MatPasswordStrengthModule.forRoot(),
        StoreModule.forFeature('user', reducers),
        EffectsModule.forFeature([UserEffects])
    ],
    providers: [],
    declarations: [
        LoginComponent,
        ChangepasswordComponent,
        ForgotpasswordComponent,
        SwitchagentComponent
    ],
    exports: [
        LoginComponent
    ]
})
export class AccountModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faUser,
            faLock
        );
    }
}