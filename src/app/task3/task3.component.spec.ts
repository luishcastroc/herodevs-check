import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Task3Component } from './task3.component';

describe('Task3Component', () => {
  let component: Task3Component;
  let fixture: ComponentFixture<Task3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Task3Component]
    });
    fixture = TestBed.createComponent(Task3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});