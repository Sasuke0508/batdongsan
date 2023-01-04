import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "reactstrap";
import "./assets/style/global.scss";
import ToastMessage from "./components/core/ToastMessage";
import Footer from "./components/Footer";
import Header from "./components/Header.js";
import Pages from "./pages/index.js";
import { settingsDispatch } from "./store/slices/settingsSlice";

function App() {
    
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loginStatus = localStorage.getItem("find_room_login_status");
        dispatch(settingsDispatch.actSetLoginStatus(loginStatus == "true"));
    }, []);

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