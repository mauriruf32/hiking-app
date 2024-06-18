import Landing from './Views/Landing/Landing';
import Home from './Views/Home/Home';
import { Route, Routes } from "react-router-dom";


function App() {

  

  return (
    <div>
      <Routes>
      <Route path="/" element={<Landing  />} />
      <Route path="/home" element={<Home  />} />
      </Routes>
    </div>
  );
}

export default App;
