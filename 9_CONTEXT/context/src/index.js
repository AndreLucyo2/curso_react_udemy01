import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//importa o provedor de dados:
import { CounterContextProvider } from './context/CouterContext';

//Importa contexto mais complexos
import { TitleColorContextProvider } from './components/TitleColorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/*2 - criando o provider */}
    {/* Abraça todo o elemento que quer utilizar o context */}
    <CounterContextProvider>
      {/* contexto mais complexos */}
      <TitleColorContextProvider>
        <App />
      </TitleColorContextProvider>
    </CounterContextProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
