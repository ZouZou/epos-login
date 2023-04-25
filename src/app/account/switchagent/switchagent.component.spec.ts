import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchagentComponent } from './switchagent.component';

describe('SwitchagentComponent', () => {
  let component: SwitchagentComponent;
  let fixture: ComponentFixture<SwitchagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchagentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
