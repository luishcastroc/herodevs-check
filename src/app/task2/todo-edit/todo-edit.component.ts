import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'hd-todo-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss'],
})
export class TodoEditComponent implements OnInit, OnDestroy {
  //dependencies
  #dataService = inject(DataService);
  #formBuilder = inject(FormBuilder);
  readonly #destroy = new Subject<void>();

  /**
   * @description the ID of the todo to edit
   */
  @Input({ required: true }) todoId!: number;

  @Output() goToAdd = new EventEmitter<boolean>();

  /**
   * @description The form used to edit a todo
   */
  todoEditForm = this.#formBuilder.group({
    text: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(3)],
    }),
  });

  /**
   * @description lifecycle hook called by Angular to indicate that Angular is done creating the component
   * it checks if the todoId is set and if so, it gets the todo from the dataService and sets the value of the todoEditForm
   */
  ngOnInit() {
    let todoText = '';
    if (this.todoId) {
      this.#dataService
        .get(this.todoId)
        .pipe(takeUntil(this.#destroy))
        .subscribe((todo) => {
          if (todo) {
            todoText = todo.text;
            this.todoEditForm.setValue({ text: todoText });
          }
        });
    }
  }

  /**
   * @description when submitting the form, it calls the update method of the dataService
   */
  onSubmit() {
    this.#dataService
      .update(this.todoId, this.todoEditForm.value)
      .pipe(takeUntil(this.#destroy))
      .subscribe(() => {
        this.goToAdd.emit(true);
      });
  }

  ngOnDestroy(): void {
    this.#destroy.next();
    this.#destroy.complete();
  }
}
