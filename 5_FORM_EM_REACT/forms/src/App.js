import './App.css';
import MyForm from './components/MyForm';

function App() {

  const user = {name:"Andre", email:"als@teste.com.br"}


  return (
    <div className="App">
      <h2>Seção 05  - - Forms</h2>
      <MyForm user={user}/>
    </div>
  );
}

export default App;
