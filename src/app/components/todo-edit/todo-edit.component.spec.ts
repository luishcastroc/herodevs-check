import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from 'src/app/data.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoEditComponent } from './todo-edit.component';

describe('TodoEditComponent', () => {
  let component: TodoEditComponent;
  let fixture: ComponentFixture<TodoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [{ provide: DataService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoEditComponent);
    component = fixture.componentInstance;
    component.todoId = 1;
    fixture.detectChanges();
  });

  it('should fetch todo and initialize form in ngOnInit', () => {
    const todo = { id: 1, text: 'test todo', completed: false };
    const dataService = TestBed.inject(DataService);
    spyOn(dataService, 'get').and.returnValue(of(todo));
    component.todoId = 1;

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.todoEditForm.get('text')?.value).toBe(todo.text);
    expect(dataService.get).toHaveBeenCalledWith(1);
  });

  it('should update the todo and emit an event when onSubmit is called', () => {
    spyOn(component.goToAdd, 'emit');
    const todo = { id: 1, text: 'test todo', completed: false };
    const dataService = TestBed.inject(DataService);
    spyOn(dataService, 'update').and.returnValue(of(todo));
    component.todoId = 1;

    component.todoEditForm.get('text')?.setValue('Updated todo');
    component.onSubmit();

    expect(dataService.update).toHaveBeenCalledWith(component.todoId, {
      text: component.todoEditForm.controls.text.value,
      completed: false,
      category: 'general',
    });
    expect(component.goToAdd.emit).toHaveBeenCalledWith(true);
  });

  it('should add category control to the form if includeCategory is true', () => {
    component.includeCategory = true;
    component.ngOnInit();
    expect(component.todoEditForm.contains('category')).toBeTrue();
  });

  it('should not add category control to the form if includeCategory is false', () => {
    component.includeCategory = false;
    component.ngOnInit();
    expect(component.todoEditForm.contains('category')).toBeFalse();
  });

  it('should set category when category is selected', () => {
    component.includeCategory = true;
    component.ngOnInit();
    const category = 'testCategory';
    component.selectedCategory.setValue(category);
    component.selectCategory();
    expect(component.todoEditForm.controls.category?.value).toEqual(category);
  });

  it('should reset category when "add-new" is selected', () => {
    component.includeCategory = true;
    component.ngOnInit();
    component.selectedCategory.setValue('add-new');
    component.selectCategory();
    expect(component.todoEditForm.controls.category?.value).toEqual('');
  });
});
