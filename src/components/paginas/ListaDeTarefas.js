import { useState, useEffect } from 'react'

function ListaDeTarefas({usuarioLogado}) {
    const [mes, setMes] = useState('');
    const [dia, setDia] = useState('');
    const [tarefa, setTarefa] = useState('');
    const [tarefas, setTarefas] = useState([]);
    const [listaDeTarefas, setListaDeTarefas] = useState([]);
    const [edicaoLista, setEdicaoLista] = useState(null);
    const [novoMes, setNovoMes] = useState('');
    const [novoDia, setNovoDia] = useState('');
    const [novaTarefa, setNovaTarefa] = useState('');

    function criarLista(e) {
        e.preventDefault();
        if (!tarefa.trim()) {
            alert("Selecione uma tarefa!");
            return;
        }
        if (!dia.trim() || !mes.trim()) {
            alert("Não é possível adicionar uma tarefa à lista sem dia ou mês");
            return;
        }
        const novaListaDeTarefas = {
            id: new Date().getTime(),
            dia: dia,
            mes: mes,
            tarefa: tarefa,
            idUsuario: usuarioLogado ? usuarioLogado.id : null 
        };
        const novasListasDeTarefas = [...listaDeTarefas, novaListaDeTarefas];
        setListaDeTarefas(novasListasDeTarefas);
        localStorage.setItem('listaDeTarefas', JSON.stringify(novasListasDeTarefas));
        setTarefa('');
        setDia('');
        setMes('');
    }

    function removerLista(id) {
        const novasListasDeTarefas = listaDeTarefas.filter(item => item.id !== id);
        setListaDeTarefas(novasListasDeTarefas);
        localStorage.setItem('listaDeTarefas', JSON.stringify(novasListasDeTarefas));
    }

    function editarLista(item) {
        setEdicaoLista(item.id);
        setNovoMes(item.mes);
        setNovoDia(item.dia);
        setNovaTarefa(item.tarefa);
    }

    function salvarEdicaoLista(item) {
        if (!novoMes.trim() || !novoDia.trim() || !novaTarefa.trim()) {
            alert("Os campos dia, mês e tarefa não podem estar vazios!");
            return;
        }
        setEdicaoLista(null);
        const novasListasDeTarefas = listaDeTarefas.map(lista => {
            if (lista.id === item.id) {
                return { ...lista, dia: novoDia, mes: novoMes, tarefa: novaTarefa };
            }
            return lista;
        });
        setListaDeTarefas(novasListasDeTarefas);
        localStorage.setItem('listaDeTarefas', JSON.stringify(novasListasDeTarefas));
    }

    useEffect(() => {
        const listasSalvas = JSON.parse(localStorage.getItem('listaDeTarefas') || '[]');
        setListaDeTarefas(listasSalvas);

        const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas') || '[]');
        setTarefas(tarefasSalvas);
    }, []);

    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    return (
        <div>
            <h1 style={{ fontFamily: 'Arial' }} className="titulo">Lista de Tarefas</h1>
            <form autoComplete="off">
                <select id="mes" name="mes" value={mes} onChange={(e) => setMes(e.target.value)}>
                    <option value="">Mês</option>
                    {meses.map((mes, index) => (
                        <option key={index + 1} value={index + 1}>
                            {mes}
                        </option>
                    ))}
                </select>
                <select id="dia" name="dia" value={dia} onChange={(e) => setDia(e.target.value)}>
                    <option value="">Dia</option>
                    {[...Array(31)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                            {index + 1}
                        </option>
                    ))}
                </select>
                <select value={tarefa} onChange={(e) => setTarefa(e.target.value)}>
                    <option value="">Tarefa</option>
                    {tarefas.filter(tarefa => tarefa.idUsuario === usuarioLogado.id).map(tarefa => (
                        <option key={tarefa.id} value={tarefa.nome}>{tarefa.nome}</option>
                    ))}
                </select>
                <button type="submit" onClick={criarLista}>Criar</button>
            </form>
            <table>
    <thead>
        <tr>
            <th>Data</th>
            <th>Tarefa</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        {listaDeTarefas.filter(lista => lista.idUsuario === usuarioLogado.id).map(item => (
            <tr key={item.id}>
                <td>{item.dia}/{item.mes}</td>
                <td>
                    {edicaoLista === item.id ? (
                        <>
                            <select value={novoMes} onChange={(e) => setNovoMes(e.target.value)}>
                                <option value="">Mês</option>
                                {meses.map((mes, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {mes}
                                    </option>
                                ))}
                            </select>
                            <select value={novoDia} onChange={(e) => setNovoDia(e.target.value)}>
                                <option value="">Dia</option>
                                {[...Array(31)].map((_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>
                            <select value={novaTarefa} onChange={(e) => setNovaTarefa(e.target.value)}>
                                <option value="">Tarefa</option>
                                {tarefas.filter(tarefa => tarefa.idUsuario === usuarioLogado.id).map(tarefa => (
                                    <option key={tarefa.id} value={tarefa.nome}>{tarefa.nome}</option>
                                ))}
                            </select>
                            <button onClick={() => salvarEdicaoLista(item)} className="btn-salvar"></button>
                        </>
                    ) : (
                        <>
                            {item.tarefa}
                        </>
                    )}
                </td>
                <td>
                    <button onClick={() => removerLista(item.id)} className="btn-remover"></button>
                    <button onClick={() => editarLista(item)} className="btn-editar"></button>
                </td>
            </tr>
        ))}
    </tbody>
</table>

        </div>
    );
}

export default ListaDeTarefas;
