import styles from './BannerHome.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function BannerHome() {
  return (
    <section className={styles.banner}>
      <div className={styles.textContainer}>
        <h1>Com caridade o pobre é rico, sem caridade o rico é pobre.</h1>
        <p>-Santo Agostinho</p>
        <div className={styles.buttonontainer}>
            <Link href="/doacoes-disponiveis">
                <button className={styles.BannerButton1}>Mais Adoradas</button>
            </Link>
            <Link href="/doacoes">
                <button className={styles.BannerButton2}>Gerar Doação</button>
            </Link>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="/banner-image.png"
          alt="Imagem de doação"
          width={500}
          height={250}
          className={styles.image}
        />
      </div>
    </section>
  );
}
