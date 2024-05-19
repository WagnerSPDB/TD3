import stylesApp from "../../App.css"
import { useState, useEffect } from 'react'

function Tarefa({usuarioLogado}){
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [tarefas, setTarefas] = useState([]);

    const [edicaoTarefa, setEdicaoTarefa] = useState(null);
    const [novoNomeTarefa, setNovoNomeTarefa] = useState('');
    const [novaCategoriaTarefa, setNovaCategoriaTarefa] = useState('');

    useEffect(() => {
        const listCategorias = JSON.parse(localStorage.getItem('categorias') || '[]');
        setCategorias(listCategorias);

        const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas') || '[]');
        setTarefas(tarefasSalvas);
    }, []);

    function cadastrarTarefa(e) {
        e.preventDefault();
        if(!nome.trim()){
            alert("Não é possível criar uma tarefa sem nome!");
            return;
        }
        if(!categoria.trim()){
            alert("Não é possível criar uma tarefa sem categoria!");
            return;
        }

        const novaTarefa = {
            id: new Date().getTime(),
            nome: nome,
            categoria: categoria,
            idUsuario: usuarioLogado ? usuarioLogado.id : null 
        };

        const novasTarefas = [...tarefas, novaTarefa];
        setTarefas(novasTarefas);
        localStorage.setItem('tarefas', JSON.stringify(novasTarefas));

        setNome('');
        setCategoria('');
        
    }

    function removerTarefa(id) {
        const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
        setTarefas(novasTarefas);
        localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
    }

    function editarTarefa(tarefa) {
        setEdicaoTarefa(tarefa.id);
        setNovoNomeTarefa(tarefa.nome);
        setNovaCategoriaTarefa(tarefa.categoria);
    }

    function salvarEdicaoTarefa(tarefa) {
        if (!novoNomeTarefa.trim() || !novaCategoriaTarefa.trim()) {
            alert("Os campos nome e categoria não podem estar vazios!");
            return;
        }
        setEdicaoTarefa(null);
        const novasTarefas = tarefas.map(item => {
            if (item.id === tarefa.id) {
                return { ...item, nome: novoNomeTarefa, categoria: novaCategoriaTarefa };
            }
            return item;
        });
        setTarefas(novasTarefas);
        localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
    }
    
    return(
        <div className = {stylesApp.body}>
            <h1 style={{ fontFamily: 'Arial' }} className="titulo">Tarefas</h1>
            <form onSubmit = {cadastrarTarefa}>
                <select value = {categoria} onChange = {(e) => setCategoria(e.target.value)}>
                <option value="">Categoria</option>
                {categorias.filter(categoria => categoria.idUsuario === usuarioLogado.id).map(categoria => (
                        <option key={categoria.id} value={categoria.nome}>{categoria.nome}</option>
                    ))}
            </select>
            <input 
            value={nome}
            placeholder="Digite:"
            onChange = {(e) => setNome(e.target.value)}/>
            <button>Criar</button>
            </form>
            <table>
    <thead>
        <tr>
            <th>Categoria</th>
            <th>Nome</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        {tarefas.filter(tarefa => tarefa.idUsuario === usuarioLogado.id).map(tarefa => (
            <tr key={tarefa.id}>
                <td>{tarefa.categoria}</td>
                <td>
                    {edicaoTarefa === tarefa.id ? (
                        <>
                            <input
                                type="text"
                                value={novoNomeTarefa}
                                onChange={(e) => setNovoNomeTarefa(e.target.value)}
                            />
                            <select value={novaCategoriaTarefa} onChange={(e) => setNovaCategoriaTarefa(e.target.value)}>
                                <option value="">Categoria</option>
                                {categorias.filter(categoria => categoria.idUsuario === usuarioLogado.id).map(categoria => (
                                    <option key={categoria.id} value={categoria.nome}>{categoria.nome}</option>
                                ))}
                            </select>
                            <button onClick={() => salvarEdicaoTarefa(tarefa)} className="btn-salvar"></button>
                        </>
                    ) : (
                        <>
                            {tarefa.nome}
                        </>
                    )}
                </td>
                <td>
                    <button onClick={() => removerTarefa(tarefa.id)} className="btn-remover"></button>
                    <button onClick={() => editarTarefa(tarefa)} className="btn-editar"></button>
                </td>
            </tr>
        ))}
    </tbody>
</table>

        </div>
    )
}
export default Tarefa
