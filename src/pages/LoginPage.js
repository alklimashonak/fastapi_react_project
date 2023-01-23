import Body from "../components/Body";
import {useEffect, useState, useRef} from "react";
import InputField from "../components/InputField";
import Form from "react-bootstrap/Form";
import {Button, Card, Container, Stack} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useFlash} from "../contexts/FlashProvider";
import {useUser} from "../contexts/UserProvider";

export default function LoginPage() {
    const [formErrors, setFormErrors] = useState({});
    const usernameField = useRef();
    const passwordField = useRef();
    const flash = useFlash();
    const {login} = useUser()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        usernameField.current.focus();
    }, []);

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const username = usernameField.current.value;
        const password = passwordField.current.value;

        const errors = {};
        if (!username) {
            errors.username = 'Username must not be empty.';
        }
        if (!password) {
            errors.password = 'Password must not be empty.';
        }
        setFormErrors(errors);
        const result = await login(username, password);
        if (result === 'fail') {
            flash('Invalid username or password', 'danger');
        } else if (result === 'ok') {
            let next = '/';
            if (location.state && location.state.next) {
                next = location.state.next;
            }
            navigate(next);
        }
    };

    return (
        <Body>
            <h1>Login</h1>
            <Container className='d-flex justify-content-center align-items-center'>
                <Card className='FormCard' border='primary'>
                    <Form onSubmit={onSubmit}>
                        <InputField
                            name="username" label="Email address"
                            error={formErrors.username} fieldRef={usernameField}/>
                        <InputField
                            name="password" label="Password" type="password"
                            error={formErrors.password} fieldRef={passwordField}/>
                        <Stack direction="horizontal" gap={3} className='justify-content-between'>
                            <Button
                                variant="primary"
                                type="submit"
                                className='align-self-start w-25'
                            >
                                Login
                            </Button>
                            <div className='align-items-center align-items-end'>
                                Don&apos;t have an account? <Link to="/register">Register here</Link>!
                            </div>
                        </Stack>
                    </Form>
                </Card>
            </Container>
        </Body>
    );
}