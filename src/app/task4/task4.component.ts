import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Task3Component from '../task3/task3.component';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'hd-task4',
  standalone: true,
  imports: [CommonModule, TodoEditComponent, ReactiveFormsModule],
  templateUrl: './task4.component.html',
  styleUrls: ['./task4.component.scss'],
})
export default class Task4Component extends Task3Component {}
