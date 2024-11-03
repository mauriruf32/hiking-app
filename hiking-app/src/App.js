import Landing from './Views/Landing/Landing';
import Home from './Views/Home/Home';
import { Route, Routes  } from "react-router-dom";
import LogOut from './Components/LogOut/LogOut';
import DetailPage from './Views/DetailPage/DetailPage.jsx';
import HikingForm from './Views/HikingForm/HikingForm.jsx';
import Registration from './Views/Registration/Registration.jsx';
import Login from './Views/LogIn/LogIn.jsx';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './ProtectedRoute.jsx';
import NavBar from './Components/NavBar/NavBar.jsx';
import { HikingProvider } from './Context/HikingContext.jsx';
import ProfileHikings from './Components/Cards/ProfileHikings.jsx';
import Favorite from './Components/Card/Favorite.jsx';



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
        <Route path="/hikingplaces/:id" element={<DetailPage/>} />
        {/* <Route path="/favorite" element={<Favorite/>} /> */}

      <Route element={<ProtectedRoute/>}>
        <Route path="/logout" element={<LogOut  />} />
        <Route path="/profile" element={<ProfileHikings  />} />
        <Route path="/hikingform" element={<HikingForm  />} />
        {/* <Route path="/home" element={<Home  />} /> */}

      </Route>
      </Routes>
    </HikingProvider>
  </AuthProvider>



  );
}

export default App;
