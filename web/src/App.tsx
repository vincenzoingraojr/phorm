import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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

function App() {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

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

    return (
        <Routes>
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
                path="/verify/:token"
                element={
                    <IsNotAuthenticated
                        isAuth={isAuth}
                        children={<VerifyAccount />}
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
    );
}

export default App;
