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
  selector: 'hd-task3',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TodoEditComponent,
    TodosComponent,
    TodosListComponent,
  ],
  templateUrl: './task3.component.html',
  styleUrls: ['./task3.component.scss'],
})
export default class Task3Component extends Task2Component {}
