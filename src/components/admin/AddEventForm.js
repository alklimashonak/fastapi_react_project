import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputField from '../InputField';
import { Button } from 'react-bootstrap';
import { useFlash } from '../../contexts/FlashProvider';
import { useApi } from '../../contexts/ApiProvider';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function AddEventForm({ eventsCount, setEventsCount }) {
    const [formErrors, setFormErrors] = useState({});
    const [addEventHidden, setAddEventHidden] = useState(true);
    const nameField = useRef();
    const [deadlineValue, onChange] = useState(new Date());
    const flash = useFlash();
    const api = useApi();

    useEffect(() => {
        !addEventHidden && nameField.current.focus();
    }, [addEventHidden]);

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const name = nameField.current.value;
        const deadline = deadlineValue;

        const errors = {};
        if (!name) {
            errors.name = 'Name must not be empty.';
        }

        if (!deadline) {
            errors.deadline = 'You should choose deadline time'
        }

        setFormErrors(errors);

        if (errors) {
            return;
        }

        const result = await api.post(`/events`, {
            name: name,
            deadline: deadline
        });

        if (result.status === 422) {
            const errorMsg = `${result.body.detail[0].msg} (${result.body.detail[0].loc[1]})`
            flash(errorMsg, 'danger');
        } else if (result.ok) {
            setEventsCount(eventsCount + 1)
            nameField.current.value = ""
        }
    };

    return (
        addEventHidden ?
            <Button onClick={() => setAddEventHidden(!addEventHidden)}>
                {
                    addEventHidden && 'Add event'
                }
            </Button> :
            <Form onSubmit={onSubmit}>
                <InputField
                    name="name" label="Name"
                    error={formErrors.name} fieldRef={nameField} />
                <div>
                    <DateTimePicker onChange={onChange} value={deadlineValue} />
                </div>
                <Button onSubmit={onSubmit}
                    variant="primary"
                    type="submit"
                    className='align-self-start w-25'
                >
                    Add
                </Button>
                <Button onClick={() => setAddEventHidden(!addEventHidden)}>
                    Close
                </Button>
            </Form>
    );
}