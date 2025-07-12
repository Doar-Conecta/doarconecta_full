import styles from './SectionQuemSomos.module.css';
import Link from 'next/link';

export default function SectionQuemSomos() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <span className={styles.label}>ONGs</span>
        <h2 className={styles.title}>Para quem doar?</h2>
        <p className={styles.text}>
          ONGs mais amadas são aquelas que receberam mais corações, ganhando destaque no Doar Conecta.
          Ao fazer doações, você aumenta a visibilidade de ONG e ajuda a alcançar metas de arrecadação.
          Mostre apoio às suas ONG favoritas e faça a diferença com alguns cliques.
          Quanto mais Doações, maiores chances de aparecerem aqui.
        </p>
        <div className={styles.buttons}>
          <Link href="/doacoes-disponiveis">
            <button className={styles.outlined}>Veja as ONGs mais amadas</button>
          </Link>
          <Link href="/doacoes-disponiveis">
            <button className={styles.filled}>Itens & ONGs</button>
          </Link>
          <Link href="/doacoes">
            <button className={styles.filled}>Novo Doador!</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
