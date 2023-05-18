
# Task 1


*User Story*

> As a user of this application,
> I want to enter things/tasks I must do, one at a time, so as to compile a list of todos
> so that I may print them for later


*Notes*:

- Create a form with 1 field
  - form should not submit unless form field/input value length is > 2
  - form field should show invalid if it has been interacted with and field/input value length is <= 2
  - Store list of tasks/things/todos in [Data service](../data.service.ts)
  - After a task/thing/todo is created, it should appear in a list on the screen
    - Each task/thing/todo in the list should appear on its own line with a clickable 'x'
      - Any representation of 'delete', 'remove', 'x' (etc) is fine
      - When clicked the corresponding task/thing/todo is removed from the list in real time


*When finished*:

Start [task 2](../task2/README.md)
