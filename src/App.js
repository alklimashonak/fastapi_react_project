import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import ApiProvider from "./contexts/ApiProvider";
import UserProvider from "./contexts/UserProvider";
import FlashProvider from "./contexts/FlashProvider";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
    return (
        <Container fluid className="App">
            <BrowserRouter>
                <FlashProvider>
                    <ApiProvider>
                        <UserProvider>
                            <Header />
                            <Routes>
                                <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>}></Route>
                                <Route path='/register' element={<PublicRoute><RegisterPage /></PublicRoute>}></Route>
                                <Route path='*' element={
                                    <PrivateRoute>
                                        <Routes>
                                            <Route path='/' element={<HomePage />}></Route>
                                            <Route path='/events' element={<EventsPage />}></Route>
                                            <Route path='/events/:event_id' element={<EventPage />}></Route>
                                            <Route path="*" element={<Navigate to="/" />} />
                                        </Routes>
                                    </PrivateRoute>
                                } />
                            </Routes>
                        </UserProvider>
                    </ApiProvider>
                </FlashProvider>
            </BrowserRouter>
        </Container>
    );
}

export default App;
