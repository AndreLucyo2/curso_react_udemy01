// Imports do router:
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//firebase: mapeia a autenticação se foi feita com sucesso
import { onAuthStateChanged } from "firebase/auth";

//Styles:
import './App.css';

// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//Pages:
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// context
import { AuthProvider } from "./contexts/AuthContext";
import CreatePost from "./pages/CreatePost/CreatePost";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  //---------------------------------------------------------
  //monitorar o status do usuario:
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  //se for = undefined user ainda esta carregando, 
  //Serve para nao exibir nada antes de usuario estar autenticado
  const loadingUser = user === undefined;

  //Fica monitorando resposta se o user esta autenticado
  useEffect(() => {
    //Monitora a autenticação do firebase
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  //enquanto o backend nao responte nao carrega o sistema
  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  //---------------------------------------------------------




  return (
    <div className="App">
      {/* Recebe o usuario logado */}
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />

              {/* valida e bloqueia rota caso nao tiver logado
                  valida se nao tem usuario redireciona para o login 
                  Se tem user vai para novo post
              */}
              <Route
                path="/posts/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />

              {/* valida e bloqueia rota caso nao tiver logado
                  valida se nao tem usuario redireciona para o login 
                  Se tem user vai para home
              */}
              <Route
                path='/login'
                element={!user ? <Login /> : <Navigate to='/' />}
              />

              {/* valida e bloqueia rota caso nao tiver logado
                  valida se nao tem usuario redireciona para o criar registro 
                  Se tem user vai para home
              */}
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />

              {/* valida e bloqueia rota caso nao tiver logado
                  valida se nao tem usuario redireciona para o login 
              */}
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />

            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
