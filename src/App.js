import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/paginas/Login.js';
import Tarefa from './components/paginas/Tarefa.js';
import ListaDeTarefas from './components/paginas/ListaDeTarefas.js';
import Categoria from './components/paginas/Categoria.js';
import Cadastro from './components/paginas/Cadastro.js';
import Home from './components/paginas/Home';
import Navbar from './components/layout/Navbar.js';
import Footer from './components/layout/Footer.js';

function App() {
  const [loginAtivo, setLoginAtivo] = useState(() => {
    return localStorage.getItem('loginAtivo') === 'true';
  });

  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    return JSON.parse(localStorage.getItem('usuarioLogado')) || { nome: "Usuário Padrão", id: null };
  });

  useEffect(() => {
    localStorage.setItem('loginAtivo', loginAtivo.toString());
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
  }, [loginAtivo, usuarioLogado]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar loginAtivo={loginAtivo} />
      <Routes>
        <Route exact path="/" element={<Home usuario={usuarioLogado || { nome: "Usuário Padrão", id: null}} />} />
        <Route path="/login" element={<Login setLoginAtivo={setLoginAtivo} setUsuarioLogado={setUsuarioLogado} />} />
        <Route path="/tarefa" element={<Tarefa usuarioLogado={usuarioLogado} />} />
        <Route path="/listaDeTarefas" element={<ListaDeTarefas usuarioLogado={usuarioLogado} />} />
        <Route path="/categoria" element={<Categoria usuarioLogado={usuarioLogado} />} />
        <Route path="/cadastro" element={<Cadastro cadastroDisabled={loginAtivo} />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
