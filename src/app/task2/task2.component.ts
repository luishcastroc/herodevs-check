import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Mode } from '../models';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TodoEditComponent,
  TodosComponent,
  TodosListComponent,
} from '../components';
import { DataService } from '../data.service';

@Component({
  selector: 'hd-task2',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TodosComponent,
    TodosListComponent,
    TodoEditComponent,
  ],
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.scss'],
})
export default class Task2Component {
  /**
   * @description The list of tasks
   * @returns Observable<Todo[]>
   */
  protected todos$ = inject(DataService).getData();

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
