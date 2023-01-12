import {Container} from "react-bootstrap";

export default function Body({ children }) {
    return (
        <Container className="Body">
            {children}
        </Container>
    )
}