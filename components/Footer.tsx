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
          <h3>Acesso Rápido</h3>
          <ul>
            <li>Quem somos</li>
            <li>Trabalhe conosco</li>
            <li>Contato</li>
            <li>Parceiros</li>
            <li>Gerar Doação</li>
          </ul>
        </div>

        <div className={styles.contactSection}>
          <h3>Fale Conosco</h3>
          <p>Atendimento de Segunda a Sexta Feira<br />Das 07:00 às 20:00</p>
          <p>Domingo e Feriados<br />Das 09:00 às 14:00</p>
        </div>

        <div className={styles.securitySection}>
          <Image src="/site-seguro.png" alt="Site 100% Segura" width={150} height={80} />
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© 2025 - Todos direitos reservados</p>
      </div>
    </footer>
  );
}
