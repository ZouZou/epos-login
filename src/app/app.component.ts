import { Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { storageAction } from './store/actions';
import { AppStateInterface } from './types/appState.interfcase';

@Component({
  selector: 'dq-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'epos-login';

  constructor(
    private readonly renderer: Renderer2,
    private readonly store: Store<AppStateInterface>,
  ) {}

  ngOnInit() {
    // this.renderer.listen('window', 'storage', event => {
    //   console.log(event.key);
    //   this.store.dispatch(storageAction({ payload: event.key as string }));
    // });
  }  
}
