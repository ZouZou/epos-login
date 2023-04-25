import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, of, take } from "rxjs";
import { AppStateInterface } from "../types/appState.interfcase";
import * as fromStore from "../store/selectors";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(private router: Router, private store: Store<AppStateInterface>) { }
    canActivate() {
        return this.checkStoreAuthentication().pipe(
            mergeMap(storeAuth => {
                if (storeAuth) return of(true);
                return of(false);
                //return this.checkApiAuthentication();
            }),
            map(storeOrApiAuth => {
                if (!storeOrApiAuth) {
                    this.router.navigate(['/login']);
                    return false;
                }

                return true;
            })
        );
    }
    
  checkStoreAuthentication() {
    return this.store.select(fromStore.selectIsLoggedIn).pipe(take(1));
  }
}