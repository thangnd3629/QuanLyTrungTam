import React from "react"
import {Navbar, Nav, NavDropdown, Form,FormControl,Button} from 'react-bootstrap';
const navBar = () => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/classes">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                
                <Nav.Link href="/classes" >Classes</Nav.Link>
                <Nav.Link href="/students" >Students</Nav.Link>
                <Nav.Link href="/newstudent" >New student</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/about">About</NavDropdown.Item>
                    <NavDropdown.Item href="/teacher">Teacher</NavDropdown.Item>
                    
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="/help">Help</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
            </Form>
        </Navbar.Collapse>
    </Navbar>
)
export default navBar;