import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  category?: string;
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  #initialData: Todo[] = [];
  #data = new BehaviorSubject<Todo[]>([]);
  #nextId = 1;
  readonly #defaultTodo: Todo = {
    id: -1,
    text: '',
    completed: false,
  };

  constructor() {
    this.initialize();
  }

  public resetData(): void {
    this.initialize();
  }

  public getData(): Observable<Todo[]> {
    return this.#data.asObservable();
  }

  public get(id: number): Observable<Todo | undefined> {
    return of(this.#data.getValue().find((todo) => todo.id === id));
  }

  public add(todo: Partial<Todo>): Observable<Todo> {
    const newTodo = { ...this.#defaultTodo, ...todo, id: this.#nextId++ };
    this.#data.next([...this.#data.value, newTodo]);
    return of(newTodo);
  }

  public update(id: number, todo: Partial<Todo>): Observable<Todo> {
    const updatedTodo = { ...this.#defaultTodo, ...todo, id };
    const todos = this.#data
      .getValue()
      .map((todo) => (todo.id === id ? updatedTodo : todo));
    this.#data.next(todos);
    return of(updatedTodo);
  }

  public remove(id: number): Observable<void> {
    this.#data.next(this.#data.value.filter((t) => t.id !== id));
    return of();
  }

  private initialize() {
    this.#nextId = this.#initialData.length + 1;
    this.#data.next(this.#initialData);
  }
}
