import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import { TopNav } from './components/NavBar';

import { Landing } from "./pages/LandingPage";
import { Login } from "./pages/LoginPage";
import { Register } from "./pages/RegisterPage";
import { AddSubject, EditSubject } from "./pages/SubjectPage";
import { ViewSubjects } from './pages/ViewSubjectsPage';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext()
  
  return (
    <>
      <TopNav/>
      <Routes>
        <Route 
          exact path="/" 
          element={<Landing />}
        />
        <Route 
          exact path="/login" 
          element={ !user ? <Login /> : <Navigate to="/viewsubs"/>}
        />
        <Route 
          exact path="/register" 
          element={ !user 
            ? <Register /> 
            : <Navigate to="/viewsubs"/> }
        />

        <Route 
          exact path="/addsubs" 
          element={ user && user.userRole === 'Registrar' 
            ? <AddSubject /> 
            : <Navigate to="/login" />}
        />

        <Route 
          exact path="/editsub/:id" 
          element={ user && user.userRole === 'Registrar' 
            ? <EditSubject /> 
            : <Navigate to="/login" />}
        />

        <Route 
          exact path="/viewsubs" 
          element={ user 
            ? <ViewSubjects />
            : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;