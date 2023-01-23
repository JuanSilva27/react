import React from "react";
import { Button, Form } from "react-bootstrap";

export const FormTask = ({onChange, inputValues, submit, formRef}) => {
  return (
    <Form onSubmit={submit} ref={formRef}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Titulo</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Ingresa un titulo" 
        value={inputValues.title} 
        onChange={onChange} 
        name="title" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Imagen</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Ingresa un url" 
        value={inputValues.img} 
        onChange={onChange} 
        name="img" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Descripcion</Form.Label>
        <Form.Control 
        as={"textarea"} 
        type="text" 
        placeholder="Ingresa una descripcion" 
        value={inputValues.description} 
        onChange={onChange} 
        name="description" />
      </Form.Group>

      
      <Button variant="success" type="submit" className="mx-2">
        Agregar
      </Button>
      <Button variant="danger" type="reset">
        Reiniciar
      </Button>
    </Form>
  );
};
