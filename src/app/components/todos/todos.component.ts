import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { DataService, Todo } from '../../data.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoForm } from '../../task1/task1.component';
import { TodosListComponent } from '../todos-list/todos-list.component';

@Component({
  selector: 'hd-todos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TodosListComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  #dataService = inject(DataService);
  #formBuilder = inject(FormBuilder);

  @Input() withCategory = false;

  /**
   * @description The list of tasks
   * @returns Observable<Todo[]>
   */
  readonly todos$ = this.#dataService.getData();

  /**
   * @description The list of categories
   * @returns Observable<string[]>
   */
  readonly categories$ = this.#dataService.getCategories();

  /**
   * @description The selected category from the dropdown
   */
  selectedCategory = this.#formBuilder.control('', {
    nonNullable: true,
  });

  /**
   * @description The form used to add a new task
   * @returns FormGroup
   */
  todoForm = this.#formBuilder.group<TodoForm>({
    text: this.#formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  ngOnInit(): void {
    if (this.withCategory) {
      this.todoForm.addControl(
        'category',
        this.#formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        })
      );
    }
  }

  /**
   * @description Adds a new task to the list, if the category is not set, the default category is used
   * @returns void
   */
  onSubmit() {
    if (this.todoForm.valid) {
      const todo: Partial<Todo> = {
        text: this.todoForm.get('text')?.value,
        completed: false,
        category:
          this.todoForm.get('category')?.value ??
          this.#dataService.getdefaultCategory(),
      };

      this.#dataService.add(todo).subscribe(() => {
        this.todoForm.reset();
        this.selectedCategory.reset();
      });
    }
  }

  /**
   * @description Sets the category of the todo
   */
  selectCategory() {
    if (
      this.selectedCategory.value &&
      this.selectedCategory.value !== 'add-new'
    ) {
      this.todoForm.controls.category?.setValue(this.selectedCategory.value);
    } else {
      this.todoForm.controls.category?.setValue('');
    }
  }
}
