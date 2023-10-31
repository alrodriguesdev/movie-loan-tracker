import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function MyNavbar() {
  return (
    <Navbar className="bg-dark">
      <Container>
        <Navbar.Brand className="text-white" href="#home">
          Movie Loan Management System
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="text-white">
            Signed in as:{" "}
            <a href="#login" className="text-white">
              Mark Otto
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
