import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { TodosComponent } from './todos.component';
import { DataService } from '../../data.service';
import { Todo } from '../../data.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    const dataServiceMock = {
      getData: jasmine.createSpy('getData').and.returnValue(of([])),
      getCategories: jasmine.createSpy('getCategories').and.returnValue(of([])),
      add: jasmine.createSpy('add').and.returnValue(of({})),
      getdefaultCategory: jasmine
        .createSpy('getdefaultCategory')
        .and.returnValue('default'),
    };

    await TestBed.configureTestingModule({
      imports: [TodosComponent],
      providers: [{ provide: DataService, useValue: dataServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should load todos and categories on initialization', () => {
    expect(dataService.getData).toHaveBeenCalled();
    expect(dataService.getCategories).toHaveBeenCalled();
  });

  it('should add category control if withCategory is true', () => {
    component.withCategory = true;
    component.ngOnInit();
    expect(component.todoForm.contains('category')).toBeTrue();
  });

  it('should not add category control if withCategory is false', () => {
    component.withCategory = false;
    component.ngOnInit();
    expect(component.todoForm.contains('category')).toBeFalse();
  });

  it('should create a todo when form is valid and submitted', () => {
    const testTodo: Partial<Todo> = {
      text: 'Test Todo',
      completed: false,
      category: 'default',
    };

    component.todoForm.setValue({ text: testTodo.text as string });
    component.onSubmit();

    expect(dataService.add).toHaveBeenCalledWith(testTodo);
    expect(component.todoForm.get('text')?.value).toBe('');
  });

  it('should not create a todo when form is invalid', () => {
    const testTodo: Partial<Todo> = {
      text: '',
      completed: false,
      category: 'default',
    };

    component.todoForm.setValue({ text: testTodo.text as string });
    component.onSubmit();

    expect(dataService.add).not.toHaveBeenCalled();
  });

  it('should set category when category is selected', () => {
    const category = 'testCategory';
    component.withCategory = true;
    component.ngOnInit();
    component.selectedCategory.setValue(category);
    component.selectCategory();
    expect(component.todoForm.controls.category?.value).toEqual(category);
  });

  it('should reset category when "add-new" is selected', () => {
    component.withCategory = true;
    component.ngOnInit();
    component.selectedCategory.setValue('add-new');
    component.selectCategory();
    expect(component.todoForm.controls.category?.value).toEqual('');
  });

  it('should not submit form if form is invalid', () => {
    const invalidTodoForm = {
      text: '',
    };

    component.todoForm.setValue(invalidTodoForm);
    component.onSubmit();

    expect(dataService.add).not.toHaveBeenCalled();
  });

  it('should not set category when selectedCategory is undefined', () => {
    component.withCategory = true;
    component.ngOnInit();
    component.selectedCategory.setValue('');
    component.selectCategory();

    expect(component.todoForm.controls.category?.value).toEqual('');
  });

  it('should reset form after a todo is added', () => {
    const validTodoForm = {
      text: 'Test Todo',
    };

    component.todoForm.setValue(validTodoForm);
    component.onSubmit();

    expect(component.todoForm.get('text')?.value).toBe('');
    expect(component.selectedCategory.value).toBe('');
  });

  it('form should not submit unless form field/input value length is > 2', () => {
    const invalidTodoForm = {
      text: 'Te',
    };

    component.todoForm.setValue(invalidTodoForm);
    component.onSubmit();

    expect(dataService.add).not.toHaveBeenCalled();
  });
});
