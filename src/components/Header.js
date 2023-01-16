import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <Navbar bg="primary" variant="dark" className='Header'>
            <Container>
                <Navbar.Brand as={NavLink} to="/" end>
                    React Bootstrap
                </Navbar.Brand>
                <Nav.Item>
                    <Nav.Link as={NavLink} to='/users'>Users</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link>Teams</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to='/drivers'>Drivers</Nav.Link>
                </Nav.Item>
            </Container>
        </Navbar>
    )
}