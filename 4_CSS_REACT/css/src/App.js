import './App.css';
import MyComponent from './components/MyComponent';

function App() {
  return (
    <div className="App">
      
      {/* CSS Global */}
      <h1>React com CSS</h1>

      {/* CSS de componente */}
      <MyComponent/>      
      <p>Este é um paragrafo do App.js casa CSS</p>
    </div>
  );
}

export default App;
