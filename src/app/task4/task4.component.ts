import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TodoEditComponent,
  TodosComponent,
  TodosListComponent,
} from '../components';
import { ReactiveFormsModule } from '@angular/forms';
import Task2Component from '../task2/task2.component';
import { DataService } from '../data.service';

@Component({
  selector: 'hd-task4',
  standalone: true,
  imports: [
    CommonModule,
    TodoEditComponent,
    TodosComponent,
    TodosListComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './task4.component.html',
  styleUrls: ['./task4.component.scss'],
})
export default class Task4Component extends Task2Component {
  #dataService = inject(DataService);
  onFilter(filter: string) {
    this.todos$ = this.#dataService.filterByCategory(filter);
  }
}
