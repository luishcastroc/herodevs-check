import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Todo } from '../../data.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'hd-todos-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent {
  #dataService = inject(DataService);
  readonly categories$ = this.#dataService.getCategories();
  //set todos internally it can be null
  @Input({ required: true }) set todos(todos: Todo[] | null) {
    if (todos) {
      this._todos = todos;
    }
  }
  @Input() withEdit = false;
  @Input() withConfirmDelete = false;
  @Input() withFilter = false;
  @Output() edit = new EventEmitter<number>();
  @Output() filter = new EventEmitter<string>();
  _todos: Todo[] = [];

  filterSelect = new FormControl('all', { nonNullable: true });

  /**
   * @description Removes a task from the list
   * @param todoId The id of the todo to remove from the list
   */
  onRemove(todoId: number) {
    const todo = this._todos.find((todo) => todo.id === todoId);
    if (todo) {
      if (
        this.withConfirmDelete &&
        confirm(
          `Are you sure you want to delete this ${todo.category} ${todo.text}?`
        )
      ) {
        this.#dataService.remove(todoId);
      } else if (!this.withConfirmDelete) {
        this.#dataService.remove(todoId);
      }
    }
  }

  changeFilter() {
    this.filter.emit(this.filterSelect.value);
  }
}
