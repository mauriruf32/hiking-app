import { useLocation } from 'react-router-dom'; // Importamos useLocation
import Landing from './Views/Landing/Landing';
import Home from './Views/Home/Home';
import { Route, Routes } from 'react-router-dom';
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
import Favorites from './Views/Favorites/Favorites.jsx';
import ProfileForm from './Views/Profile/ProfileForm.jsx'

function App() {
  const location = useLocation(); // Obtenemos la ubicación actual

  // Condicionalmente mostrar el NavBar solo si no estamos en la página de inicio (landing)
  const showNavBar = location.pathname !== "/"; // Solo mostrar si la ruta no es "/"

  return (
    <AuthProvider>
      <HikingProvider>
        {/* Mostramos el NavBar solo si no estamos en la página de inicio */}
        {showNavBar && <NavBar />}

        <Routes>
          {/* Ruta Landing, sin NavBar */}
          <Route path="/" element={<Landing />} />

          {/* Rutas con NavBar */}
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hikingplaces/:id" element={<DetailPage />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/logout" element={<LogOut />} />
            <Route path="/profile" element={<ProfileHikings />} />
            <Route path="/profile/:id" element={<ProfileForm />} />
            <Route path="/hikingform" element={<HikingForm />} />
            <Route path="/edit/:id" element={<HikingForm />} />
            <Route path="/favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </HikingProvider>
    </AuthProvider>
  );
}

export default App;
