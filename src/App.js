import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import "./assets/style/global.scss";
import ToastMessage from "./components/core/ToastMessage";
import Footer from "./components/Footer";
import Header from "./components/Header.js";
import Pages from "./pages/index.js";
import { tokenDispatch } from "./store/slices/tokenSlice";
import { settingsDispatch } from "./store/slices/settingsSlice";

function App() {
    
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const token = useSelector(store => store.tokenSlice.user);

    useEffect(() => {
        const loginStatus = localStorage.getItem("find_room_login_status");
        dispatch(settingsDispatch.actSetLoginStatus(loginStatus == "true"));
    }, []);
    

    useEffect(() => {

        const tokenLocal = localStorage.getItem('token');
        if (tokenLocal) {
            dispatch(
                tokenDispatch.setToken(JSON.parse(tokenLocal))
            );
            localStorage.removeItem('token');
        }                    

        const handleKeepSession = () => {
            if (token) {
                localStorage.setItem('token', JSON.stringify(token));
            } else {
                localStorage.removeItem('token');
            }
        }

        window.addEventListener('beforeunload', handleKeepSession)

        return () => {
            window.removeEventListener('beforeunload', handleKeepSession);
        }
    }, [token]);

    return (
        <div className="App">
            {loading ? (
                <div className="d-flex justify-content-center mt-5">
                    <Spinner>Loading...</Spinner>
                </div>
            ) : (
                <div>
                    <div>
                        <Header />
                        <ToastMessage />
                    </div>
                    <div>
                        <Pages />
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            )}
        </div>
    );
}
export default App;