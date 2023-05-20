import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TodosComponent, TodosListComponent } from '../components';

export interface TodoForm {
  text: FormControl<string>;
  category?: FormControl<string>;
}

/**
 * @description This component is used to display a list of tasks
 */
@Component({
  selector: 'hd-task1',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TodosComponent,
    TodosListComponent,
  ],
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.scss'],
})
export default class Task1Component {
  /**
   * @description The list of tasks
   * @returns Observable<Todo[]>
   */
  readonly todos$ = inject(DataService).getData();
}
