import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./components/home/home.jsx";
// import Play from "./components/play/play.jsx";
// import Statistics from "./components/statistics/statistics.jsx";

function App() {
  return (
      <>
          <BrowserRouter>
              {/*<Nav />*/}
              <Routes>
                  <Route path="/" element={<Home />}></Route>
                  {/*<Route path="/play" element={<Play />}></Route>*/}
                  {/*<Route path="/statistics" element={<Statistics />} />*/}
                  <Route path="*" element={<h1>Error 404</h1>}></Route>
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
