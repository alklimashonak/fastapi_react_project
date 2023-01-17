import {Container} from "react-bootstrap";
import FlashMessage from "./FlashMessage";

export default function Body({ children }) {
    return (
        <Container className="Body">
            <FlashMessage />
            {children}
        </Container>
    )
}