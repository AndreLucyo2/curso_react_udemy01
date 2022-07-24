import './App.css';
import MyForm from './components/MyForm';

function App() {

  //carregar a pagina ja pre´-preenchida recebendo dados, pode ser de uma API...
  const user = { name: "Andre", email: "als@teste.com.br", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum non felis ac tempus. Quisque et porttitor nulla. Nulla porta risus et convallis hendrerit. Vestibulum tincidunt auctor odio, lacinia accumsan dolor porttitor molestie. Nam eu luctus nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, nunc tincidunt pretium mattis, mi justo eleifend nisl, et aliquam ex dui sit amet ante. Suspendisse id mi in orci finibus commodo hendrerit quis dui. Nunc nec gravida." }

  return (
    <div className="App">
      <h2>Seção 05  - - Forms</h2>
      <MyForm user={user} />
    </div>
  );
}

export default App;
