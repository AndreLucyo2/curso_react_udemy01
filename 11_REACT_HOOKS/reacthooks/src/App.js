
import './App.css';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

//importa o contexto:
import { HookUseContext } from './components/HookUseContext';

//Pages:
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <div className="App">
      <h1>React Hooks</h1>
      {/* Abreça todos os compoentes em que se quer utilizar o contexto */}
      <HookUseContext>
        <BrowserRouter>
          {/* Navegação */}
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">Sobre</Link>
            </li>
          </ul>
          {/* Roteamento: */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </BrowserRouter>
      </HookUseContext>
    </div>
  );
}

export default App;
