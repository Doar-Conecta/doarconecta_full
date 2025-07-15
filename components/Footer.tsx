import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <Image src="/doarconecta-logo.png" alt="Logo Doar Conecta" width={80} height={80} />
          <h2>DOAR CONECTA</h2>
        </div>

        <div className={styles.linksSection}>
          <ul>
            <li>Trabalhe conosco</li>
            <li>Contato</li>
            <li>Parceiros</li>
          </ul>
        </div>

        <div className={styles.contactSection}>
          <h3>Fale Conosco</h3>
          <p>Atendimento de Segunda a Sexta Feira<br />Das 07:00 às 19:00</p>
          <p>Domingo e Feriados<br />Das 09:00 às 14:00</p>
        </div>

      </div>

      <div className={styles.bottomBar}>
        <p>© 2025 - Grupo 03 - Full Digital Project - Bootcamp - Todos direitos reservados</p>
      </div>
    </footer>
  );
}
