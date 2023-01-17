import Body from "../components/Body";
import {useEffect, useState, useRef} from "react";
import InputField from "../components/InputField";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function LoginPage() {
    const [formErrors, setFormErrors] = useState({});
    const usernameField = useRef();
    const passwordField = useRef();

    useEffect(() => {
        usernameField.current.focus();
    }, []);

    const onSubmit = (ev) => {
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
        if (Object.keys(errors).length > 0) {
            return;
        }
    };

    return (
        <Body>
            <h1>Login</h1>
            <Form onSubmit={onSubmit}>
                <InputField
                    name="username" label="Email address"
                    error={formErrors.username} fieldRef={usernameField} />
                <InputField
                    name="password" label="Password" type="password"
                    error={formErrors.password} fieldRef={passwordField} />
                <Button variant="primary" type="submit">Login</Button>
            </Form>
            <hr />
            <p>Don&apos;t have an account? <Link to="/register">Register here</Link>!</p>
        </Body>
    );
}