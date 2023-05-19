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
  #categories = new BehaviorSubject<string[]>([]);
  #nextId = 1;
  readonly #defaultCategory = 'general';
  readonly #defaultTodo: Todo = {
    id: -1,
    text: '',
    completed: false,
    category: this.#defaultCategory,
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
    if (!todo.category) {
      todo.category = this.#defaultCategory;
    }
    const newTodo = { ...this.#defaultTodo, ...todo, id: this.#nextId++ };
    const categoryExists = this.#categories.getValue().includes(todo.category!);
    if (!categoryExists) {
      this.addCategory(todo.category!);
    }
    this.#data.next([...this.#data.value, newTodo]);
    return of(newTodo);
  }

  public update(id: number, todo: Partial<Todo>): Observable<Todo> {
    const updatedTodo = { ...this.#defaultTodo, ...todo, id };
    const todos = this.#data
      .getValue()
      .map((todo) => (todo.id === id ? updatedTodo : todo));
    const categoryExists = this.#categories.getValue().includes(todo.category!);
    if (!categoryExists) {
      this.addCategory(todo.category!);
    }
    this.#data.next(todos);
    return of(updatedTodo);
  }

  public remove(id: number): Observable<void> {
    this.#data.next(this.#data.value.filter((t) => t.id !== id));
    return of();
  }

  public getCategories(): Observable<string[]> {
    return this.#categories.asObservable();
  }

  public addCategory(category: string): Observable<string> {
    this.#categories.next([...this.#categories.getValue(), category]);
    return of(category);
  }

  private initialize() {
    this.#nextId = this.#initialData.length + 1;
    this.#data.next(this.#initialData);
  }
}
