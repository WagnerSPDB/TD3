import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login({ setLoginAtivo, setUsuarioLogado }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editUsuario, setEditUsuario] = useState('');
  const [editSenha, setEditSenha] = useState('');
  const navigate = useNavigate();

  function Logar(e) {
    e.preventDefault();

    if (localStorage.getItem('loginAtivo') === 'true') {
      alert("Você já está logado!");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(user => user.nome === usuario && user.senha === senha);
    if (usuarioEncontrado) {
      setLoginAtivo(true);
      setUsuarioLogado(usuarioEncontrado);
      localStorage.setItem('loginAtivo', true);
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
      navigate('/');
    } else {
      alert('Usuário ou senha incorretos');
    }
    setUsuario('');
    setSenha('');
  }

  function Sair() {
    if(editMode === true){
      alert("Não pode sair enquanto edita!");
      return;
    }
    setLoginAtivo(false);
    localStorage.setItem('loginAtivo', false);
    setUsuarioLogado({ nome: "Usuário Padrão", id: null });
  }

  function Editar() {
    if(localStorage.getItem('loginAtivo') === 'false'){
      alert("Não pode editar sem estar conectado!");
      return;
    }
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado) {
      setEditUsuario(usuarioLogado.nome);
      setEditSenha(usuarioLogado.senha);
      setEditMode(true);
    } else {
      alert('Nenhum usuário logado encontrado.');
    }
  }

  function SalvarEdicao() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    const usuarioIndex = usuarios.findIndex(user => user.id === usuarioLogado.id);
    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].nome = editUsuario;
      usuarios[usuarioIndex].senha = editSenha;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarios[usuarioIndex]));
      setUsuarioLogado(usuarios[usuarioIndex]);
      alert('Informações atualizadas com sucesso!');
    } else {
      alert('Erro ao atualizar informações.');
    }

    setEditMode(false);
  }

  function ExcluirConta() {
    if(editMode === true){
      alert("Não pode excluir conta enquanto edita!");
      return;
    }
    if (!window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    const usuariosAtualizados = usuarios.filter(user => user.id !== usuarioLogado.id);
    localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));

    setLoginAtivo(false);
    localStorage.setItem('loginAtivo', false);
    localStorage.removeItem('usuarioLogado');
    setUsuarioLogado({ nome: "Usuário Padrão", id: null });
    alert('Conta excluída com sucesso.');
    navigate('/');
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Arial' }} className="titulo">Login</h1>
      {!editMode ? (
        <form onSubmit={Logar}>
          <input value={usuario}
            placeholder="Usuário"
            onChange={(e) => setUsuario(e.target.value)}
            disabled={localStorage.getItem('loginAtivo') === 'true'}
          />
          <input value={senha}
            type='password'
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
            disabled={localStorage.getItem('loginAtivo') === 'true'}
          />
          <button type="submit">Logar</button>
        </form>
      ) : (
        <div>
          <input value={editUsuario}
            placeholder="Novo Usuário"
            onChange={(e) => setEditUsuario(e.target.value)}
          />
          <input value={editSenha}
            type='password'
            placeholder="Nova Senha"
            onChange={(e) => setEditSenha(e.target.value)}
          />
          <button onClick={SalvarEdicao}>Salvar Alterações</button>
        </div>
      )}
      <button onClick={Sair}>Sair</button>
      <button onClick={Editar}>Editar</button>
      <button onClick={ExcluirConta} style={{ backgroundColor: 'red', color: 'white' }}>Excluir Conta</button>
    </div>
  );
}

export default Login;
