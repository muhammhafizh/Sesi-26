import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavUser({ logout, cart, isLoggedin}) {
  return (
    <Navbar bg="secondary" variant="dark">
      {isLoggedin && (
        <Container>
          <Navbar.Brand>Bukapedia</Navbar.Brand>
          <Nav className="me-auto">
            <Link
              to={isLoggedin ? "/home" : "/"}
              style={{ textDecoration: "none" }}
            >
              <Nav.Link href="/home">Home</Nav.Link>
            </Link>
          </Nav>
          <Nav className="me-auto">
            <Link
              to={isLoggedin ? "/cart" : "/"}
              style={{ textDecoration: "none" }}
            >
              <Nav.Link href="/cart">Cart {cart > 0 ? cart : " "}</Nav.Link>
            </Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Button
              href="/"
              variant="success"
              type="submit"
              onClickCapture={logout}
            >
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      )}
    </Navbar>
  );
}

export default NavUser;
