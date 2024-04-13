import { Button, Container, Row, Table } from "react-bootstrap"

export const Subject = ()=>{
    const handleShow = ()=>{};
    return(
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
          <h3 style={{ maxWidth: "fit-content" }}>Curse Name/ Physices</h3>
          <Button
            style={{ maxWidth: "fit-content" }}
            variant="primary"
            onClick={handleShow}
          >
            Add New +
          </Button>
        </Row>
      </Container>
        <Table style={{marginTop:'40px'}} striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Created On</th>
          <th>Links</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Chapter 1</td>
          <td>20/4/2024</td>
          <td style={{display:'flex',justifyContent:'space-evenly',gap:'10px'}}>
          <a href="/videos">Lectures</a>
            <a href="/notes">Notes</a>
            <a href="#">Edit</a>
            <a href="#" style={{color:'red'}}>Delete</a>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Chapter 2</td>
          <td>20/4/2024</td>
          <td style={{display:'flex',justifyContent:'space-evenly'}}>
            <a href="/videos">Lectures</a>
            <a href="/notes">Notes</a>
            <a href="#">Edit</a>
            <a href="#" style={{color:'red'}}>Delete</a>
          </td>
        </tr>
      </tbody>
    </Table>
        </>
        
    )
}