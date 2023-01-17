import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <Navbar bg="primary" variant="dark" className='Header'>
            <Container>
                <Navbar.Brand as={NavLink} to="/" end>
                    React Bootstrap
                </Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to='/users'>Users</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>Teams</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to='/drivers'>Drivers</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to='/login'>Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to='/register'>Registration</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    )
}