import stylesApp from "../../App.js";
import { useState, useEffect } from 'react';

function Categoria({ usuarioLogado }) {
    const [categorias, setCategorias] = useState([]);
    const [nome, setNome] = useState('');
    const [edicaoCategoria, setEdicaoCategoria] = useState(null);
    const [novoNomeCategoria, setNovoNomeCategoria] = useState('');

    useEffect(() => {
        const listCategorias = JSON.parse(localStorage.getItem('categorias') || '[]');
        setCategorias(listCategorias);
    }, []);

    function cadastrarCategoria(e) {
        e.preventDefault();
        if (!nome.trim()) {
            alert("Não é possível criar uma categoria sem nome!");
            return;
        }
        const novaCategoria = {
            id: new Date().getTime(),
            nome: nome,
            idUsuario: usuarioLogado ? usuarioLogado.id : null
        };
        const novasCategorias = [...categorias, novaCategoria];
        setCategorias(novasCategorias);
        localStorage.setItem('categorias', JSON.stringify(novasCategorias));
        setNome('');
    }

    function removerCategoria(id) {
        const novasCategorias = categorias.filter(categoria => categoria.id !== id);
        setCategorias(novasCategorias);
        localStorage.setItem('categorias', JSON.stringify(novasCategorias));
    }

    function editarCategoria(categoria) {
        setEdicaoCategoria(categoria.id);
        setNovoNomeCategoria(categoria.nome);
    }

    function salvarEdicaoCategoria(categoria) {
        if (!novoNomeCategoria.trim()) {
            alert("O nome da categoria não pode estar vazio!");
            return;
        }
        setEdicaoCategoria(null);
        const novasCategorias = categorias.map(item => {
            if (item.id === categoria.id) {
                return { ...item, nome: novoNomeCategoria };
            }
            return item;
        });
        setCategorias(novasCategorias);
        localStorage.setItem('categorias', JSON.stringify(novasCategorias));
    }

    return (
        <>
            <div className={stylesApp.body}>
                <form onSubmit={cadastrarCategoria}>
                    <h1 style={{ fontFamily: 'Arial' }} className="titulo">Categoria</h1>
                    <input
                        value={nome}
                        placeholder="Digite:"
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <button type="submit">Criar</button>
                </form>
            </div>
            <div>
                <table>
    <thead>
        <tr>
            <th>Categoria</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        {categorias.filter(categoria => categoria.idUsuario === usuarioLogado.id).map(categoria => (
            <tr key={categoria.id}>
                <td>
                    {edicaoCategoria === categoria.id ? (
                        <>
                            <input
                                type="text"
                                value={novoNomeCategoria}
                                onChange={(e) => setNovoNomeCategoria(e.target.value)}
                            />
                            <button onClick={() => salvarEdicaoCategoria(categoria)} className="btn-salvar"></button>
                        </>
                    ) : (
                        <>
                            {categoria.nome}
                        </>
                    )}
                </td>
                <td>
                    <button onClick={() => removerCategoria(categoria.id)} className="btn-remover"></button>
                    <button onClick={() => editarCategoria(categoria)} className="btn-editar"></button>
                </td>
            </tr>
        ))}
    </tbody>
</table>

            </div>
        </>
    );
}

export default Categoria;
