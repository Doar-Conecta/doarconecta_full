import styles from './BannerHome.module.css';
import Image from 'next/image';

export default function BannerHome() {
  return (
    <section className={styles.banner}>
      <div className={styles.textContainer}>
        <h1>Com caridade o pobre é rico, sem caridade o rico é pobre.</h1>
        {/* <p>Junte-se a nós para transformar doações em esperança.</p> */}
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
