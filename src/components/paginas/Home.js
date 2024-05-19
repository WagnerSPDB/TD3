function Home({ usuario }) {
    const { nome } = usuario;

  return (
    <div>
      <h1>TaskMaster</h1>
      <p>Olá, {nome}!</p>
      <p>Seja bem-vindo ao gerenciador de tarefas.</p>
    </div>
  );
}

export default Home;
