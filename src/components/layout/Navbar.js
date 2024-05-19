import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar({ loginAtivo }) {
  
  return (
    <div className={styles.navbar}>
      <ul className={styles.list}>
        <li className={styles.item}><Link to="/">Home</Link></li>
        <li className={styles.item}><Link to="/categoria">Categoria</Link></li>
        <li className={styles.item}><Link to="/tarefa">Tarefa</Link></li>
        <li className={styles.item}><Link to="/listaDeTarefas">Lista De Tarefas</Link></li>
        <li className={styles.item}><Link to="/login">Login</Link></li>
        {!loginAtivo && <li className={styles.item}><Link to="/cadastro">Cadastrar</Link></li>}
      </ul>
    </div>
  );
}

export default Navbar;
