import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AdminNavScrollExample() {
  return (
    <Navbar expand="lg" data-bs-theme="dark" style={{position:'sticky',top:'0px',zIndex:'99999',backgroundColor:'#070F2B'}}>
      <Container fluid>
        <Navbar.Brand href="/" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'10px'}}>
        <img
          className="img-thumbnail mx-auto d-block"
          src={'/edlogo.jpg'}
          alt="logo"
          style={{width:'40px',height:'40px'}}
        />
            Admin
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Courses</Nav.Link>
            <Nav.Link href="/teachers">Teachers</Nav.Link>
            <Nav.Link href="/students">Admins</Nav.Link>
            <Nav.Link href="/students">Students</Nav.Link>
            <Nav.Link href="/students">Doubts</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavScrollExample;