import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from "./components/navbar/navbar.jsx";
import Home from "./components/home/home.jsx";
// import Play from "./components/play/play.jsx";
import Statistics from "./components/Statistics/Statistics.jsx";
import Notfound from "./components/notfound/notfound.jsx";

function App() {
  return (
      <>
          <BrowserRouter>
              <Navbar />
              <Routes>
                  <Route path="/" element={<Home />} />
                  {/*<Route path="/play" element={<Play />}></Route>*/}
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="*" element={<Notfound />} />
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
