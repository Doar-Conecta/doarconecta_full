import styles from './ContentFind.module.css';

export default function ContentFind() {
  return (
    <section className={styles.contentFind}>
      <div className={styles.container}>
        <div className={styles.field}>
          <label>Buscar ONG</label>
          <input type="text" placeholder="Buscar por nome" />
        </div>

        <div className={styles.field}>
          <label>Categoria</label>
          <select>
            <option>Todas as categorias</option>
            <option>Educação</option>
            <option>Saúde</option>
            <option>Meio Ambiente</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Localização</label>
          <select>
            <option>Estado</option>
            <option>SP</option>
            <option>RJ</option>
            <option>MG</option>
          </select>
        </div>
        <div className={styles.divButton}>
            <button className={styles.searchButton}>
            Buscar <span className={styles.icon}>🔍</span>
            </button>
        </div>
      </div>
    </section>
  );
}
