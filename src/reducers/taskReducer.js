const generateId = () => Math.random().toString(36).substring(2, 18);

export const taskReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        const newTask = {
          ...action.payload,
          id: generateId(),
          active: false,
          completed: false,
          date: new Date().toLocaleString(),
        };
        return [...state, newTask];
  
      case "UPDATED":
        const taskToUpdate = action.payload;
        const tasksUpdated = state.map((task) => {
          if (task.id === taskToUpdate.id) {
            return {
              ...task,
              ...taskToUpdate,
            };
          }
          return task;
        });
        return tasksUpdated;
  
      case "DELETE":
        const idTaskToDelete = action.payload;
        const restTask = state.filter((task) => task.id !== idTaskToDelete);
        return restTask;
      
      case "TOGGLE_ACTIVE":
        const idTaskToActive= action.payload
        const taskToActive = state.map((task)=>{
          if (task.id === idTaskToActive){
            return {
              ...task,
              active: !task.active,
              completed: task.completed ? false : task.completed
            }
          }
          return task
        })
        return taskToActive
  
      case "TOGGLE_COMPLETED":
        const idTaskToCompleted = action.payload
        const taskToCompleted = state.map((task)=>{
          if(task.id === idTaskToCompleted){
            return {
              ...task,
              completed: !task.completed,
              active: task.active ? false : task.active
            }
          }
          return task
        })
        return taskToCompleted
      default:
        return state;
    }
  };