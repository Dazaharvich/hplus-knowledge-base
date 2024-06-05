"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [cases, setCases] = useState([]); // definir el estado cases, que almacena los casos obtenidos de la base de datos.
  const [search, setSearch] = useState(''); // definir el estado search, que almacena el término de búsqueda introducido por el usuario.

//llamado a la API
  useEffect(() => {
    axios.get('/api/cases')
      .then(response => setCases(response.data))
      .catch(error => console.error('Error buscando datos:', error));
  }, []);


//Filtra los casos según el término de búsqueda
  const filteredCases = cases.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>Knowledge Base</h1>
        </div>
        

        {/* Campo de entrada para el término de búsqueda - Actualiza estado search */}
        <input
          type="text"
          placeholder="Busqueda de casos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </header>

      {/* Render de los resultados de busqueda */}
      <div className={styles.caseList}>
        {filteredCases.map(c => (
          <div key={c.id} className={styles.case}>
            <h2>{c.title}</h2>
            <p>{c.description}</p>
            <p><strong>Solution:</strong> {c.solution}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;