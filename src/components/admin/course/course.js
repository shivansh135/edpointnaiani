import { Button, Col, Container, Form, Row } from "react-bootstrap"

export const AdminCource = ()=>{
    return(
        <>
            <div className="contCard">
            <img src='/physics.webp' alt="sample"></img>
            <div className="text-wrap">
                <h4>Course Name</h4>
                <div className="text">
                In the hallowed halls of Education Point, where knowledge blooms and aspirations take flight. In the hallowed halls of Education Point, where knowledge blooms and aspirations take flight.
                </div>
                <Row style={{display:'flex',gap:'43px'}}>
                <Button style={{maxWidth:'fit-content'}} variant="success">10 Students</Button>
                <Button style={{maxWidth:'fit-content'}} variant="danger">Go Live</Button>
                </Row>
            </div>
         </div>
         <Container style={{marginTop:'40px'}}>
            <h4>Subjects</h4>
         <Row style={{gap:'23px'}}>
         <Button style={{maxWidth:'fit-content'}} variant="success">Physics</Button>
            <Button style={{maxWidth:'fit-content'}} variant="success">Chemistry</Button>
            <Button style={{maxWidth:'fit-content'}} variant="primary">New +</Button>
        </Row>
         </Container>
    <Container style={{marginTop:'40px'}}>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="courseName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course name"
                name="name"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter course description"
                name="description"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
          <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Upload Course Image *</Form.Label>
    <Form.Control type="file" />
  </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                name="price"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="discount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter discount"
                name="discount"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="notes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter additional notes"
            name="notes"
          />
        </Form.Group>
        <Button variant="primary">
          Update
        </Button>{' '}
      </Form>
    </Container>

        </>
    )
}