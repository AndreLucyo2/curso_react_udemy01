//components
import FirstComponent from './components/FirstComponent';

//styles /css
import './App.css';
import TemplateExpressions from './components/TemplateExpressions';
import MyComponent from './components/MyComponent';
import Events from './components/Events';

function App() {
  return (
    <div className="App">
      <h1>Fundamentos</h1>   
      <FirstComponent/>
      <TemplateExpressions/> 
      <MyComponent/>
      <Events/>
    </div>
  );
}

export default App;
