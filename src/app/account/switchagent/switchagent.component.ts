import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Agent } from 'src/app/models/agent';
import { agentsList, getToken, userSelector } from 'src/app/store/selectors';
import { AppStateInterface } from 'src/app/types/appState.interfcase';
import * as UserActions from '../../store/actions';

@Component({
  selector: 'dq-switchagent',
  templateUrl: './switchagent.component.html',
  styleUrls: ['./switchagent.component.scss']
})
export class SwitchagentComponent {
  agents$?: Observable<Agent[] | undefined>;

  constructor(private store: Store<AppStateInterface>) {
    this.agents$ = this.store.pipe(select(agentsList));
  }

  selectAgent(agent: Agent): void {
    this.store.dispatch(UserActions.selectAgent({ agent: agent }));
  }
}
