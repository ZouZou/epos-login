import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CardComponent } from "./components/card/card.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { AuthInterceptorInterceptor } from "./Interceptors/auth-interceptor.interceptor";
import { LoadingInterceptor } from "./Interceptors/loading.interceptor";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
        },
        {
            provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true
        }
    ],
    declarations: [
        SpinnerComponent,
        CardComponent
    ],
    exports: [
        SpinnerComponent,
        CardComponent
     ]
})
export class SharedModule {
}