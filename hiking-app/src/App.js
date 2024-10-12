import Landing from './Views/Landing/Landing';
import Home from './Views/Home/Home';
import { Route, Routes  } from "react-router-dom";
import LogOut from './Components/LogOut/LogOut';
import Profile from './Views/Profile/Profile';
import HikingForm from './Views/HikingForm/HikingForm.jsx';
import Registration from './Views/Registration/Registration.jsx';
import Login from './Views/LogIn/LogIn.jsx';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './ProtectedRoute.jsx';
import NavBar from './Components/NavBar/NavBar.jsx';
import { HikingProvider } from './Context/HikingContext.jsx';



function App() {
 
 

  return (
  <AuthProvider>
    <HikingProvider>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Landing  />} />
        <Route path="/home" element={<Home  />} />
        <Route path="/register" element={<Registration  />} />
        <Route path="/login" element={<Login/>} />

      <Route element={<ProtectedRoute/>}>
        <Route path="/logout" element={<LogOut  />} />
        <Route path="/profile" element={<Profile  />} />
        <Route path="/hikingform" element={<HikingForm  />} />
      </Route>
      </Routes>
    </HikingProvider>
  </AuthProvider>



  );
}

export default App;
