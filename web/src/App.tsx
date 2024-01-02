import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import IsAuthenticated from "./components/routes/IsAuthenticated";
import IsNotAuthenticated from "./components/routes/IsNotAuthenticated";
import Authentication from "./pages/Authentication";
import HomePage from "./pages/HomePage";
import ModifyPassword from "./pages/ModifyPassword";
import VerifyAccount from "./pages/VerifyAccount";
import { setAccessToken } from "./utils/token";
import Preloader from "./components/utils/Preloader";
import Modal from "./components/utils/modal/Modal";
import VerifyEmailAddress from "./pages/account/VerifyEmailAddress";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecoverPassword from "./pages/RecoverPassword";

function App() {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const location = useLocation();

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_ORIGIN!, {
            method: "POST",
            credentials: "include",
        }).then(async (x) => {
            const { accessToken } = await x.json();
            setAccessToken(accessToken);
            if (accessToken && accessToken !== "") {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Preloader />;
    }

    document.body.classList.remove("not-scrolling");

    let state = location.state as { backgroundLocation?: Location };

    return (
        <>
            <Routes location={state?.backgroundLocation || location}>
                <Route
                    path="/"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<Authentication />}
                        />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<Login />}
                        />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<Signup />}
                        />
                    }
                />
                <Route
                    path="/verify/:token"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<VerifyAccount />}
                        />
                    }
                />
                <Route
                    path="/recover-password"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<RecoverPassword />}
                        />
                    }
                />
                <Route
                    path="/modify-password/:token"
                    element={
                        <IsNotAuthenticated
                            isAuth={isAuth}
                            children={<ModifyPassword />}
                        />
                    }
                />
                <Route
                    path="/account/verify-email/:token"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={
                                <Modal
                                    headerText="Verify your email address"
                                    modalContent={<VerifyEmailAddress />}
                                />
                            }
                        />
                    }
                />
                <Route
                    path="/home"
                    element={
                        <IsAuthenticated
                            isAuth={isAuth}
                            children={<HomePage />}
                        />
                    }
                />
            </Routes>
            {state?.backgroundLocation && (
                <Routes>
                    <Route
                        path="/account/verify-email/:token"
                        element={
                            <IsAuthenticated
                                isAuth={isAuth}
                                children={
                                    <Modal
                                        headerText="Verify your email address"
                                        modalContent={<VerifyEmailAddress />}
                                    />
                                }
                            />
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default App;
