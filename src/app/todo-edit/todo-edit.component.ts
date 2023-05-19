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
import { TodoForm } from '../task1/task1.component';

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
  readonly categories$ = this.#dataService.getCategories();

  /**
   * @description the ID of the todo to edit
   */
  @Input({ required: true }) todoId!: number;
  /**
   * @description A boolean indicating if the category dropdown should be included
   */
  @Input() includeCategory = false;

  @Output() goToAdd = new EventEmitter<boolean>();

  /**
   * @description The form used to edit a todo
   */
  todoEditForm = this.#formBuilder.group<TodoForm>({
    text: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(3)],
    }),
  });

  /**
   * @description The selected category from the dropdown
   */
  selectedCategory = this.#formBuilder.control('', { nonNullable: true });

  /**
   * @description lifecycle hook called by Angular to indicate that Angular is done creating the component
   * it checks if the todoId is set and if so, it gets the todo from the dataService and sets the value of the todoEditForm
   */
  ngOnInit() {
    if (this.includeCategory) {
      this.todoEditForm.addControl(
        'category',
        this.#formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        })
      );
    }

    if (this.todoId) {
      this.#dataService
        .get(this.todoId)
        .pipe(takeUntil(this.#destroy))
        .subscribe((todo) => {
          if (todo) {
            this.todoEditForm.patchValue(todo);
            if (todo.category) {
              this.selectedCategory.setValue(todo.category);
            }
          }
        });
    }
  }

  /**
   * @description sets the value of the category form control
   */
  selectCategory() {
    if (this.selectedCategory.value) {
      this.todoEditForm.controls.category?.setValue(
        this.selectedCategory.value
      );
    } else {
      this.todoEditForm.controls.category?.setValue('');
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
