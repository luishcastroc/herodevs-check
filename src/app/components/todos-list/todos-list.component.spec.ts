import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TodosListComponent } from './todos-list.component';
import { DataService } from '../../data.service';

describe('TodosListComponent', () => {
  let component: TodosListComponent;
  let fixture: ComponentFixture<TodosListComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', [
      'remove',
      'getCategories',
    ]);
    await TestBed.configureTestingModule({
      imports: [TodosListComponent],
      providers: [{ provide: DataService, useValue: mockDataService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListComponent);
    component = fixture.componentInstance;
    component.todos = [];
    fixture.detectChanges();
  });

  it('should remove todo when onRemove is called and withConfirmDelete is false', () => {
    mockDataService.remove.and.returnValue(of());
    const todoId = 1;
    component.todos = [
      { id: todoId, text: 'test', category: 'category', completed: false },
    ];
    component.withConfirmDelete = false;

    component.onRemove(todoId);

    expect(mockDataService.remove).toHaveBeenCalledWith(todoId);
  });

  it('should remove todo when onRemove is called, withConfirmDelete is true and confirm is accepted', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    mockDataService.remove.and.returnValue(of());
    const todoId = 1;
    component.todos = [
      { id: todoId, text: 'test', category: 'category', completed: false },
    ];
    component.withConfirmDelete = true;

    component.onRemove(todoId);

    expect(window.confirm).toHaveBeenCalledWith(
      `Are you sure you want to delete this category test?`
    );
    expect(mockDataService.remove).toHaveBeenCalledWith(todoId);
  });

  it('should not remove todo when onRemove is called, withConfirmDelete is true and confirm is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const todoId = 1;
    component.todos = [
      { id: todoId, text: 'test', category: 'category', completed: false },
    ];
    component.withConfirmDelete = true;

    component.onRemove(todoId);

    expect(window.confirm).toHaveBeenCalledWith(
      `Are you sure you want to delete this category test?`
    );
    expect(mockDataService.remove).not.toHaveBeenCalled();
  });

  it('should emit filter event when changeFilter is called', () => {
    spyOn(component.filter, 'emit');
    const filterValue = 'completed';
    component.filterSelect.setValue(filterValue);

    component.changeFilter();

    expect(component.filter.emit).toHaveBeenCalledWith(filterValue);
  });
});
