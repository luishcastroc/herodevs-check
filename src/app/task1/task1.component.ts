import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataService, Todo } from '../data.service';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @description This component is used to display a list of tasks
 */
@Component({
  selector: 'hd-task1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.scss'],
})
export default class Task1Component {
  #dataService = inject(DataService);
  #formBuilder = inject(FormBuilder);

  /**
   * @description The list of tasks
   * @returns Observable<Todo[]>
   */
  readonly todos$ = this.#dataService.getData();

  /**
   * @description The form used to add a new task
   * @returns FormGroup
   */
  todoForm = this.#formBuilder.group({
    text: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(3)],
    }),
  });

  /**
   * @description Adds a new task to the list
   * @returns void
   */
  onSubmit() {
    if (this.todoForm.valid) {
      const todo: Partial<Todo> = {
        text: this.todoForm.controls.text.value,
        completed: false,
      };
      this.#dataService.add(todo).subscribe(() => {
        this.todoForm.reset();
      });
    }
  }

  /**
   * @description Removes a task from the list
   * @param taskId The id of the task to remove from the list
   */
  onRemove(taskId: number) {
    this.#dataService.remove(taskId);
  }
}
