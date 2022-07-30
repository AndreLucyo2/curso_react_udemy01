
import './App.css';

// 1 - Imports do router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Home from './pages/Home'
import About from './pages/About'

//Components
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <h1>React router! Cabeçalho </h1>
      <BrowserRouter>
        {/* 2 - links com react router*/}
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
      <h1>Rodapé</h1>
    </div>
  );
}

export default App;
