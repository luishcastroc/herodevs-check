## First Approach

On my first approach i tried to use inheritance between tasks since they are incremental, however this approach led me to repeat over and over some code (specifically template related)

## Second Approach

I created 3 components for the different use cases of the application, one for the creation of the TODO, one for the list of todos with the actions and the last one with the edit.

this approach was better and demostrated to be more robust and maintainable, i was able to integrate the features per task in an easier way but i used some inheritance between tasks to avoid repeating component code.
