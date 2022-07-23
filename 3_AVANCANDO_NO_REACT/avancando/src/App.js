
import './App.css';

import City from "./assets/city.jpg"
import ManageData from './components/ManageData';

function App() {
  return (
    <div className="App">
      <h1>Avançando no react</h1>
      {/* Imagen na pasta public */}
      <div>
        <img src="/img1.jpg" alt="Pausagem public" />
      </div>
      {/* Imagen na pasta src/... */}
      <div>
        <img src={City} alt="Cidade SRC" />
      </div>
      <ManageData/>
    </div>
  );
}

export default App;
