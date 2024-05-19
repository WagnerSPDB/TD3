import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Cadastro() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios') || '[]');
        setUsuarios(usuariosSalvos);
    }, []);

    const cadastrar = (e) => {
        e.preventDefault();
        if (!nome.trim() || !senha.trim()) {
            alert("Não é possível fazer cadastro sem usuário ou senha!");
            return;
        }
        const novoUsuario = {
            id: new Date().getTime(),
            nome: nome,
            senha: senha
        };
        const novosUsuarios = [...usuarios, novoUsuario];
        setUsuarios(novosUsuarios);
        localStorage.setItem('usuarios', JSON.stringify(novosUsuarios));
        setNome('');
        setSenha('');
        navigate("/login");
    };

    return (
        <div>
            <h1 style={{ fontFamily: 'Arial' }} className="titulo">Cadastro</h1>
            <form onSubmit={cadastrar}>
                <input
                    value={nome}
                    placeholder="Usuário"
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    value={senha}
                    type='password'
                    placeholder="Senha"
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

export default Cadastro
