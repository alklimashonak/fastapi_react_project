import {Container, Nav, Navbar, NavDropdown, Spinner} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useUser} from "../contexts/UserProvider";

export default function Header() {
    const {user, logout} = useUser()

    return (
        <Navbar bg="primary" variant="dark" className='Header'>
            <Container>
                <Navbar.Brand as={NavLink} to="/" end>
                    React Bootstrap
                </Navbar.Brand>
                {user === undefined ?
                    <Spinner animation='border'/>
                    :
                    <>
                        {user === null ?
                            <>
                                <Nav className='justify-content-md-end'>
                                    <Nav.Item>
                                        <Nav.Link as={NavLink} to='/login'>Login</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={NavLink} to='/register'>Registration</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </>
                            :
                            <>
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
                                    <NavDropdown title={user.email} align="end">
                                        <NavDropdown.Item as={NavLink} to='/profile'>
                                            Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item onClick={logout}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </>
                        }
                    </>
                }
            </Container>
        </Navbar>
    )
}