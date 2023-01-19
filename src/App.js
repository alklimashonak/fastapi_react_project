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
import UserProvider from "./contexts/UserProvider";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ProfilePage from "./pages/ProfilePage";
import TeamPage from "./pages/TeamPage";

function App() {
    return (
        <Container fluid className="App">
            <BrowserRouter>
                <FlashProvider>
                    <ApiProvider>
                        <UserProvider>
                            <Header/>
                            <Routes>
                                <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>}></Route>
                                <Route path='/register' element={<PublicRoute><RegisterPage /></PublicRoute>}></Route>
                                <Route path='*' element={
                                    <PrivateRoute>
                                        <Routes>
                                            <Route path='/' element={<HomePage />}></Route>
                                            <Route path='/profile' element={<ProfilePage />}></Route>
                                            <Route path='/users' element={<UsersPage />}></Route>
                                            <Route path='/drivers' element={<DriversPage />}></Route>
                                            <Route path='/teams/:teamId' element={<TeamPage />}></Route>
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
