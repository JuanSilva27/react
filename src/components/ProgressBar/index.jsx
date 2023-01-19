import { useRef, useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  ProgressBar as BarProgress,
  Form,
  Button,
  Modal,
} from "react-bootstrap";

import { ProgressBar2 } from "./ProgressBar2";

export const ProgressBar = () => {
  const [now, setNow] = useState(0);
  const [intervalState, setIntervalState] = useState(null);
  const inputRef = useRef(null);
  const [btnDisable, setBtnDisable] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleDownload = () => {
    const valueInput = inputRef.current?.value;
    const isValueValid =
      !isNaN(valueInput) && valueInput > 0 && valueInput <= 100;
    setShowModal(!isValueValid);

    if(intervalState){
        clearInterval(intervalState)
    }

    if (isValueValid) {
      const interval = setInterval(() => {
        setNow((now) => {
          if (now === +valueInput) {
            clearInterval(interval);
            return now;
          }
          return now + 1;
        });
      }, 1000);
      setIntervalState(interval);
    } else {
      handleReset();
    }

    
  };

  const handleReset = () => {
    setNow(0);
    clearInterval(intervalState);
  };

  const handleChange = ({ target: { value } }) => {
    setBtnDisable(!!!+value);
  };

  const handleClose =()=>{ setShowModal(false)}

  return (
    <Container>
      <Row className="mt-5">
        <Col xs={12} lg={{ span: 8, offset: 2 }} className="text-center">
          <Card style={{ width: "40rem" }} className="m-auto">
            <Card.Body>
              <Card.Title>Progress Bar</Card.Title>
              <BarProgress
                animated
                now={now}
                label={`${now}%`}
                variant="danger"
              />
              <ProgressBar2 now={now} label={`${now}%`}></ProgressBar2>
              

              <Form.Control
                ref={inputRef}
                placeholder="Ingresar Porcentaje"
                className="my-3"
                onChange={handleChange}
              ></Form.Control>
              <Button
                variant="primary"
                onClick={handleDownload}
                disabled={btnDisable}
              >
                Descargar
              </Button>
              <Button variant="danger" onClick={handleReset}>
                Reiniciar
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <h2 className="text-danger text-center py-4">ERROR.. ❌</h2>
            <p className="text-muted fs-4 text-center">
              Solo se acepta valores numéricos. El valor debe ser mayor a 0 y
              menor a 100.
            </p>
          </>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
