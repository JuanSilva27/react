import React from "react";
import { Button, Form, Image } from "react-bootstrap";
import classes from "./style.module.css"

export const FormTask = ({onChange, inputValues, submit, formRef, action, onReset}) => {
  return (
    <Form onSubmit={submit} ref={formRef}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Titulo</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Ingresa un titulo" 
        value={inputValues.title} 
        onChange={onChange} 
        name="title" 
      />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Image className={classes.imgPreview} fluid src={inputValues.img}/>
        <Form.Label>Imagen</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Ingresa un url" 
        value={inputValues.img} 
        onChange={onChange} 
        name="img"
      />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Descripcion</Form.Label>
        <Form.Control 
        name="description"
        placeholder="Ingresa una descripcion" 
        onChange={onChange} 
        as={"textarea"} 
        defaultValue={inputValues.description} 
      />
      </Form.Group>

      
      <Button 
        variant={action === "CREATED" ? "success" : "info"} 
        type="submit" 
        className="mx-2"
      >
        {action === "CREATED" ? "Crear" : "Actualizar"}
      </Button>
      <Button 
        variant="danger" type="reset" onClick={onReset}>
         {action === "CREATED" ? "Reiniciar" : "Cancelar"}
      </Button>
    </Form>
  );
};
