import { Routes } from '@angular/router';

/**
 * *User Story*:

> As a user of this application,
> I need to be able to navigate from task to task and see each task component's content
> so that I can easily make determinations about how and what was implemented


*Notes*:

- Establish routing in the app such that each task* component is navigable
- `task1` is to be the default route presented to the user when either:
    1. No route is entered
    2. A non-existent app route is navigated to
- Add navigation links to, and render route-specific task* content in App component
 */

export const routes: Routes = [
  { path: '', redirectTo: 'task1', pathMatch: 'full' },
  { path: 'task1', loadComponent: () => import('./task1/task1.component') },
  { path: 'task2', loadComponent: () => import('./task2/task2.component') },
  { path: 'task3', loadComponent: () => import('./task3/task3.component') },
  { path: 'task4', loadComponent: () => import('./task4/task4.component') },
  { path: 'task5', loadComponent: () => import('./task5/task5.component') },
  { path: '**', redirectTo: 'task1' },
];
