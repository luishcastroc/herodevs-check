import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Task1Component from '../task1/task1.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';
import { Mode } from '../models';

@Component({
  selector: 'hd-task2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TodoEditComponent],
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.scss'],
})
export default class Task2Component extends Task1Component {
  /**
   * @description The mode of the component
   */
  mode: Mode = 'add';
  todoId!: number;

  /**
   *
   * @param todoId The id of the todo to edit
   * @description Sets the mode to edit and sets the todoId
   */
  onEdit(todoId: number) {
    this.todoId = todoId;
    this.mode = 'edit';
  }

  /**
   *
   * @param goToAddMode A boolean indicating if the mode should be set to add
   * @description Sets the mode to add
   */
  onAdd(goToAddMode: boolean) {
    if (goToAddMode) {
      this.mode = 'add';
    }
  }
}
