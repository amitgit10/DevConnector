import { Navbar } from "./components/layout/Navbar";
import { Landing } from "./components/layout/Landing";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Alert } from "./components/layout/Alert";

const App = () => (
  <Router>
    <>
      <Navbar />
      <section className="container">
        <Alert />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </section>
    </>
  </Router>
);

export default App;
