import styles from './ContentFind.module.css';
import Link from 'next/link';


const estados = [
  'Estado','AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

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
            {estados.map(estado => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          
          </select>
        </div>
        <div className={styles.divButton}>
          <Link href="/doacoes-disponiveis"> <button className={styles.searchButton}>
            Buscar <span className={styles.icon}>🔍</span>
          </button></Link>
        </div>
      </div>
    </section>
  );
}
