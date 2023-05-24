import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom';

import { Landing } from "./pages/LandingPage";
import { Login } from "./pages/LoginPage";
import { Register } from "./pages/RegisterPage";
import { AddSubject } from "./pages/SubjectPages";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/register" element={<Register />}/>
        <Route path="/" element={<AddSubject />}  />
      </Routes>
    </>
  );
}

export default App;