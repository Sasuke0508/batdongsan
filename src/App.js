import { useState } from "react";
import { Spinner } from "reactstrap";
import "./assets/style/global.scss";
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
          </div>
          <div>
            <Pages />
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
