import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, switchMap, map, of, tap } from "rxjs";
import { Agent } from "../models/agent";
import { AccountService } from "../services/account.service";
import { AlertService } from "../services/alert.service";
import { LocalStorageService } from "../services/local-storage.service";
import * as UserActions from "./actions";

@Injectable()
export class UserEffects {
    loginUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loginUser),
            switchMap((action) =>
                this.accountService.login(action.userName, action.password).pipe(
                    map(user => {
                        user.changePassword = action.changePassword;
                        return UserActions.loginUserSuccess({ user: user });
                    }),
                    catchError(error => of(UserActions.loginUserFailure({ error: error.message })))
                )
            )
        )
    );

    loginUserSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.loginUserSuccess),
            switchMap(user => {
                if (user.user.changePassword) {
                    return of(UserActions.navigateTo({ url: '/changepassword' }));
                } else {
                    if ((user.user.agents?.length) && (user.user.agents?.length > 1)) {
                        return of(UserActions.navigateTo({ url: '/switchagent' }));
                    } else {
                        const selectAgent: any = user.user.agents?.filter((agent: Agent) => agent.code !== null)[0];
                        return of(UserActions.selectAgent({ agent: selectAgent }));
                    }
                }
            })
        )
    }
    );

    loginUserFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loginUserFailure),
            tap(error => {
                this.alertService.error(error.error);
            })
        ),
        { dispatch: false }
    );

    forgotPassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.forgotpassword),
            tap(action => {
                //console.log((!action.userName));
                if ((!action.userName) || (action.userName === "")) {
                    this.alertService.error("You need to supply a username before proceeding !");
                    return;
                }
                this.router.navigate(['/forgotpassword']);
            })
        ), { dispatch: false }
    );

    selectAgent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.selectAgent),
            tap(action => {
                console.log('leaving');
                //this.router.navigateByUrl('http://www.google.com');
                window.location.href = "https://google.com/about";
            })
        ), { dispatch: false }
    );

    navigateTo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.navigateTo),
            tap(action => {
                this.router.navigate(['' + action.url + '']);
            })
        ), { dispatch: false }
    );

    setToken$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.setToken),
            tap(action => this.localStorageService.setItem('accessToken', action.token))
        ), { dispatch: false }
    );

    constructor(private actions$: Actions,
        private accountService: AccountService,
        private router: Router,
        private alertService: AlertService,
        private localStorageService: LocalStorageService) {

    }
}