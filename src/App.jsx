import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Home, Login, Signup, Location, Items, Cart } from "./pages";
import ParticlesBackground from "./components/ParticlesBackground";

const App = () => {
  return (
    <main className='bg-black w-[100vw] h-[100vh]'>
      <div>
        <ParticlesBackground></ParticlesBackground>
      </div>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/location' element={<Location />} />
            <Route path='/items' element={<Items />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </Router>
      </div>
    </main>
  );
};

export default App;