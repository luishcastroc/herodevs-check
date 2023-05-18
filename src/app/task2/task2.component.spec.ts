import Task2Component from './task2.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('Task2Component', () => {
  let component: Task2Component;
  let fixture: ComponentFixture<Task2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Task2Component],
    });
    fixture = TestBed.createComponent(Task2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set mode to edit and todoId onEdit', () => {
    const todoId = 123;
    component.onEdit(todoId);
    expect(component.mode).toEqual('edit');
    expect(component.todoId).toEqual(todoId);
  });

  it('should set mode to add onAdd', () => {
    component.onAdd(true);
    expect(component.mode).toEqual('add');
  });
});
