import Header from "./components/Header";
import {Container} from "react-bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DriversPage from "./pages/DriversPage";
import RegisterPage from "./pages/RegisterPage";
import ApiProvider from "./contexts/ApiProvider";
import FlashProvider from "./contexts/FlashProvider";

function App() {
    return (
        <Container fluid className="App">
            <BrowserRouter>
                <FlashProvider>
                    <ApiProvider>
                        <Header/>
                        <Routes>
                            <Route path='/' element={<HomePage/>}></Route>
                            <Route path='/login' element={<LoginPage/>}></Route>
                            <Route path='/register' element={<RegisterPage/>}></Route>
                            <Route path='/users' element={<UsersPage/>}></Route>
                            <Route path='/drivers' element={<DriversPage/>}></Route>
                        </Routes>
                    </ApiProvider>
                </FlashProvider>
            </BrowserRouter>
        </Container>
    );
}

export default App;
