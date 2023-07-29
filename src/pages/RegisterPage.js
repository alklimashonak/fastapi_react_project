import Body from "../components/Body";
import {useEffect, useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import InputField from "../components/InputField";
import {Button, Card, Container, Stack} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useApi} from "../contexts/ApiProvider";
import {useFlash} from "../contexts/FlashProvider";

export default function RegisterPage() {
    const [formErrors, setFormErrors] = useState({});
    const emailField = useRef();
    const passwordField = useRef();
    const password2Field = useRef();
    const navigate = useNavigate();
    const api = useApi();
    const flash = useFlash();

    useEffect(() => {
        emailField.current.focus();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        if (passwordField.current.value !== password2Field.current.value) {
            setFormErrors({password2: "Passwords don't match"});
        } else {
            const data = await api.post('/auth/register/', {
                email: emailField.current.value,
                password: passwordField.current.value
            });
            if (!data.ok) {
                setFormErrors(data.body.detail);
                if (data.status === 422) {
                    flash(`${data.body.detail[0].msg}`, 'warning')
                } else {
                    flash(`${data.body.detail}`, 'warning')
                }
            } else {
                setFormErrors({});
                flash('You have successfully registered!', 'success')
                navigate('/login');
            }
        }
    };

    return (
        <Body>
            <h1>Register</h1>
            <Container className='d-flex justify-content-center align-items-center'>
                <Card className='FormCard' border='primary'>
                    <Form onSubmit={onSubmit}>
                        <InputField
                            name="email" label="Email address"
                            error={formErrors.email} fieldRef={emailField}/>
                        <InputField
                            name="password" label="Password" type="password"
                            error={formErrors.password} fieldRef={passwordField}/>
                        <InputField
                            name="password2" label="Password again" type="password"
                            error={formErrors.password2} fieldRef={password2Field}/>
                        <Stack direction='horizontal' gap={3} className='justify-content-between'>
                            <Button
                                variant="primary"
                                type="submit"
                                className='align-self-start w-25'
                            >
                                Register
                            </Button>
                            <div className='align-items-center align-items-end'>
                                Already have account? <Link to="/login">Log in here</Link>!
                            </div>
                        </Stack>
                    </Form>
                </Card>
            </Container>
        </Body>
    )
}