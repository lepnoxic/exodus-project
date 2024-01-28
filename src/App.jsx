import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Home, Location, Items, Cart, Delivery, NotFound } from "./pages";
import ParticlesBackground from "./components/ParticlesBackground";

const App = () => {
  return (
    <main className='bg-black w-[100vw] h-[100vh] flex flex-col'>
      <div>
        <ParticlesBackground></ParticlesBackground>
      </div>
      <div>
        <Router basename="/exodus-project">
          <Routes>
            <Route exact path='/exodus-project' element={<Home />} />
            <Route path='/location' element={<Location />} />
            <Route path='/items' element={<Items />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/delivery' element={<Delivery />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </main>
  );
};

export default App;