import { Container, Row, Col, Toast, Button, } from "react-bootstrap";
import { useShow } from "../../hook/useShow";

export const ShowHideMesage = () => {
    const {show, handleShowMessge} = useShow(false)
    return (
    <Container>
    <Row className="mt-5">
      <Col xs={12} lg={{span:6, offset:3}} className="text-center">
        <Button className="mb-2" variant={show? "danger": "success"} onClick={handleShowMessge}>
          {show ? "Ocultar" : "Mostar"}
        </Button>
        <Toast show={show} className="m-auto" onClose={handleShowMessge}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
      </Col>
    </Row>
  </Container>
  )
};
