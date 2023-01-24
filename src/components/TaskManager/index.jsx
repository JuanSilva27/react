import { useReducer } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "../../hook/useForm";
import { CardItem } from "./CardItem";
import { FormTask } from "./Form";

const generateId = () => Math.random().toString(36).substring(2, 18);

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const newTask = {
        ...action.payload,
        id: generateId(),
        active: false,
        completed: false,
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
    default:
      return state;
  }
};

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
  const [inputValues, setInputValues, handleChangeInputsValue, reset] = 
  useForm(formTaskInitialState,formRef);

  const [action, setAction] = useState("CREATED");

  const [tasks, dispatch] = useReducer(taskReducer, []); // dispatch({type,payload})

  const handleSubmit = (e) => {
    e.preventDefault();


    if (action === "CREATED") {
      dispatch({ type: "ADD", payload: inputValues });
    }
    if (action === "UPDATED") {
      dispatch({ type: "UPDATED", payload: inputValues });
    }
    reset();
  };

  const handleUpdate = (id) => {
    const taskFound = tasks.find((task) => task.id === id);
    setInputValues(taskFound);
    setAction("UPDATED");
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col sm={12} lg={3}>
          <FormTask
            onChange={handleChangeInputsValue}
            inputValues={inputValues}
            submit={handleSubmit}
            formRef={formRef}
            action={action}
          />
        </Col>

        <Col sm={12} lg={9}>
          {tasks.map((task) => {
            return (
              <CardItem
                key={task.id}
                task={task}
                onUpdate={handleUpdate}
              />
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};
