import Task2Component from '../task2/task2.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '../data.service';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';

@Component({
  selector: 'hd-task3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TodoEditComponent],
  templateUrl: './task3.component.html',
  styleUrls: ['./task3.component.scss'],
})
export default class Task3Component extends Task2Component implements OnInit {
  readonly categories$ = this.dataService.getCategories();
  selectedCategory = this.formBuilder.control('', {
    nonNullable: true,
  });

  ngOnInit(): void {
    this.todoForm.addControl(
      'category',
      this.formBuilder.control('', {
        nonNullable: true,
        validators: [Validators.required],
      })
    );
  }

  selectCategory() {
    if (this.selectedCategory.value) {
      this.todoForm.controls.category?.setValue(this.selectedCategory.value);
    } else {
      this.todoForm.controls.category?.setValue('');
    }
  }

  override onSubmit() {
    if (this.todoForm.valid) {
      const todo: Partial<Todo> = {
        text: this.todoForm.get('text')?.value,
        completed: false,
        category: this.todoForm.get('category')?.value,
      };

      this.dataService.add(todo).subscribe(() => {
        this.todoForm.reset();
      });
    }
  }
}
