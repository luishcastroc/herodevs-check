import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataService, Todo } from '../data.service';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  readonly todos$ = this.#dataService.getData();

  todoForm = this.#formBuilder.group({
    text: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

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

  onRemove(taskId: number) {
    this.#dataService.remove(taskId);
  }
}
