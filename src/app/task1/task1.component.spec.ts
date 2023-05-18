import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import Task1Component from './task1.component';
import { DataService, Todo } from '../data.service';

describe('Task1Component', () => {
  let component: Task1Component;
  let fixture: ComponentFixture<Task1Component>;
  let mockDataService: Partial<DataService>;

  beforeEach(async () => {
    mockDataService = {
      getData: jasmine.createSpy('getData').and.returnValue(of([])),
      add: jasmine.createSpy('add').and.returnValue(of({})),
      remove: jasmine.createSpy('remove').and.returnValue(of({})),
    };

    await TestBed.configureTestingModule({
      providers: [{ provide: DataService, useValue: mockDataService }],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Task1Component);
    component = fixture.componentInstance;
  });

  it('form should be invalid with less than 3 characters', () => {
    component.todoForm.controls['text'].setValue('ab');
    expect(component.todoForm.valid).toBeFalsy();
  });

  it('form should be valid with 3 or more characters', () => {
    component.todoForm.controls['text'].setValue('abc');
    expect(component.todoForm.valid).toBeTruthy();
  });

  it('should add task on submit', () => {
    const testTodo: Omit<Todo, 'id'> = { text: 'abc', completed: false };
    component.todoForm.controls['text'].setValue(testTodo.text);
    component.onSubmit();
    expect(mockDataService.add).toHaveBeenCalledWith(testTodo);
  });

  it('should remove task', () => {
    const testId = 1;
    component.onRemove(testId);
    expect(mockDataService.remove).toHaveBeenCalledWith(testId);
  });
});
