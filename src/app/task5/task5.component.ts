import Task2Component from '../task2/task2.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TodoEditComponent,
  TodosComponent,
  TodosListComponent,
} from '../components';

@Component({
  selector: 'hd-task5',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TodoEditComponent,
    TodosComponent,
    TodosListComponent,
  ],
  templateUrl: './task5.component.html',
  styleUrls: ['./task5.component.scss'],
})
export default class Task5Component extends Task2Component {}
