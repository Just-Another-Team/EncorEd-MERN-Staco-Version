import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom';

import { AddSubject } from "./pages/SubjectPages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AddSubject />}  />
      </Routes>
    </>
  );
}

export default App;
