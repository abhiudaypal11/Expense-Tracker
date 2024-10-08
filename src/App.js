
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import SignUp from "./pages/Signup"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
function App() {
  return (
   <> <ToastContainer/>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
