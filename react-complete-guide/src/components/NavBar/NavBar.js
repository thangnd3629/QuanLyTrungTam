import React from "react"
import {Navbar, Nav, NavDropdown, Form,FormControl,Button} from 'react-bootstrap';
const navBar = () => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/classes">Phần mềm quản lý lớp học</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/classes" >Lớp</Nav.Link>
                <Nav.Link href="/students" >Học sinh</Nav.Link>
                <Nav.Link href="/newstudent" >Đăng ký học sinh</Nav.Link>
                <NavDropdown title="Thêm" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/payment">Thanh toán học phí</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="/about">About</NavDropdown.Item>
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