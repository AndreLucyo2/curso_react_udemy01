import './App.css';
import MyComponent from './components/MyComponent';

function App() {
  return (
    <div className="App">

      {/* CSS Global */}
      <h1>React com CSS</h1>

      {/* CSS de componente */}
      <MyComponent />
      <p>Este é um paragrafo do App.js casa CSS</p>
      {/* Inline CSS */}
      <p style={{ color: "blueviolet", padding: "25px", borderTop: "2px solid red" }}>
        Este elemento foi estilizado de forma inline
      </p>
      <p style={{ color: "blue", padding: "25px", borderTop: "2px solid red" }}>
        Este elemento foi estilizado de forma inline
      </p>
    </div>
  );
}

export default App;
