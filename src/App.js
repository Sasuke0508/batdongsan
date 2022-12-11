import { useState } from "react";
import { Spinner } from "reactstrap";
import "./assets/style/global.scss";
import ToastMessage from "./components/core/ToastMessage";
import Footer from "./components/Footer";
import Header from "./components/Header.js";
import Pages from "./pages/index.js";
function App() {
    const [loading, setLoading] = useState(false);
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
