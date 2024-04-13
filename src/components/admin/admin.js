import { useState } from "react";
import {
  Button,
  Card,
  Container,
  FloatingLabel,
  InputGroup,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

export const Admin = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "40px 0px",
          }}
        >
          <h3 style={{ maxWidth: "fit-content" }}>All Cources</h3>
          <Button
            style={{ maxWidth: "fit-content" }}
            variant="primary"
            onClick={handleShow}
          >
            Add New +
          </Button>
        </Row>
      </Container>
      <Container>
        <Row style={{ gap: "50px" }}>
            <Link to='/cource'>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="/physics.webp" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Online</ListGroup.Item>
              <ListGroup.Item>start</ListGroup.Item>
              <ListGroup.Item>end</ListGroup.Item>
            </ListGroup>
          </Card>
          </Link>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="/physics.webp" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Online</ListGroup.Item>
              <ListGroup.Item>start</ListGroup.Item>
              <ListGroup.Item>end</ListGroup.Item>
            </ListGroup>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="/physics.webp" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Online</ListGroup.Item>
              <ListGroup.Item>start</ListGroup.Item>
              <ListGroup.Item>end</ListGroup.Item>
            </ListGroup>
          </Card>
        </Row>
      </Container>
      <Modal
        style={{ zIndex: "99999999" }}
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Cource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <Form.Group>
    <Form.Label>Name *</Form.Label>
    <Form.Control type="text"/>
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Start Date *</Form.Label>
    <Form.Control type="date" />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>End Date *</Form.Label>
    <Form.Control type="date" />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Mode Of Course *</Form.Label>
    <Form.Select aria-label="Mode Of Course">
      <option>Online</option>
      <option>Offline</option>
    </Form.Select>
  </Form.Group>
  <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Upload Course Image *</Form.Label>
    <Form.Control type="file" />
  </Form.Group>
</Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Add New
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
