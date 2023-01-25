import { useEffect, useReducer } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { filterTask } from "../../constants";
import { useForm } from "../../hook/useForm";
import { taskReducer } from "../../reducers/taskReducer";
import { CardItem } from "./CardItem";
import { FormTask } from "./Form";
import { TaskFilter } from "./TaskFilter";

/* const generateId = () => Math.random().toString(36).substring(2, 18);

const taskReducer = (state, action) => {
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
}; */

export const TaskManager = () => {
  const formTaskInitialState = {
    id: "",
    title: "",
    description: "",
    img: "",
    active: false,
    completed: false,
    date: "",
  };

  const formRef = useRef(null);
  const [inputValues, setInputValues, handleChangeInputsValue, reset] = useForm(
    formTaskInitialState,
    formRef
  );

  const [action, setAction] = useState("CREATED");

  const [statusFilter, setStatusFilter] = useState(filterTask.ALL)

  const taskStorage = localStorage.getItem("tasks")
  const initialStateReducer = JSON.parse(taskStorage) || []
  const [tasks, dispatch] = useReducer(taskReducer, initialStateReducer); // dispatch({type,payload})

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action === "CREATED") {
      dispatch({ type: "ADD", payload: inputValues });
    }
    if (action === "UPDATED") {
      dispatch({ type: "UPDATED", payload: inputValues });
    }
    reset();
    setAction("CREATED");
  };

  useEffect(() => {
    console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  const handleUpdate = (id) => {
    const taskFound = tasks.find((task) => task.id === id);
    setInputValues(taskFound);
    setAction("UPDATED");
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const handleTaskActive =(id)=>{
    dispatch({ type: "TOGGLE_ACTIVE", payload: id });
  }

  const handleReset = ()=>{
    reset()
  }

  const handleTaskCompleted =(id)=>{
    dispatch({ type: "TOGGLE_COMPLETED", payload: id})
  }

  const handleStatusFilter = (status = "") =>{
    setStatusFilter(status)
  }

  const filterTaskMethod = (task) => {
    switch (statusFilter) {
      case filterTask.PROCESS:
        return task.active === true;
      case filterTask.PENDING:
        return task.active === false;
      case filterTask.COMPLETED:
        return task.completed === true;
      default:
        return task;
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={12} lg={{span:6, offset:5}} className="mb-4">
          <TaskFilter onChangeFilter={handleStatusFilter}/>
        </Col>

        <Col sm={12} lg={3}>
          <FormTask
            onChange={handleChangeInputsValue}
            inputValues={inputValues}
            submit={handleSubmit}
            formRef={formRef}
            action={action}
            onReset={handleReset}
          />
        </Col>

        <Col sm={12} lg={9}>
          {tasks.filter(filterTaskMethod).map((task) => {
            return (
              <CardItem
                key={task.id}
                task={task}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onActive={handleTaskActive}
                onCompleted={handleTaskCompleted}

              />
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};
