
import './App.css';

// 1 - Imports do router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';

function App() {
  return (
    <div className="App">
      <h1>Tarefa seção 9</h1>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/product' element={<Product />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
