"use client";

import styles from './CarrosselDoacoes.module.css';
import { useState } from 'react';
import Image from 'next/image';

const historias = [
  {
    id: 1,
    img: '/ongs/mao-colorida.png',
    texto: 'Transforme vidas com sua doação!',
  },
  {
    id: 2,
    img: '/ongs/mao-preta-branca.png',
    texto: 'Doe agora e faça a diferença!',
  },
  {
    id: 3,
    img: '/ongs/familia.png',
    texto: 'Sua ajuda pode mudar o mundo!',
  },
  {
    id: 4,
    img: '/ongs/mao-colorida.png',
    texto: 'Transforme vidas com sua doação!',
  },
  {
    id: 5,
    img: '/ongs/mao-preta-branca.png',
    texto: 'Doe agora e faça a diferença!',
  },
  {
    id: 6,
    img: '/ongs/familia.png',
    texto: 'Sua ajuda pode mudar o mundo!',
  },
  {
    id: 7,
    img: '/ongs/mao-colorida.png',
    texto: 'Transforme vidas com sua doação!',
  },
  {
    id: 8,
    img: '/ongs/mao-preta-branca.png',
    texto: 'Doe agora e faça a diferença!',
  },
  {
    id: 9,
    img: '/ongs/familia.png',
    texto: 'Sua ajuda pode mudar o mundo!',
  },
  {
    id: 10,
    img: '/ongs/mao-colorida.png',
    texto: 'Transforme vidas com sua doação!',
  },
  {
    id: 11,
    img: '/ongs/mao-preta-branca.png',
    texto: 'Doe agora e faça a diferença!',
  },
  {
    id: 12,
    img: '/ongs/familia.png',
    texto: 'Sua ajuda pode mudar o mundo!',
  },
];

export default function CarrosselDoacoes() {
  const [startIndex, setStartIndex] = useState(0);
  const visible = historias.slice(startIndex, startIndex + 4);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + 4 < historias.length) setStartIndex(startIndex + 1);
  };

  return (
    <section className={styles.section}>
        <div className={styles.content}>
        <h2 className={styles.title}>Ultimas Histórias</h2>
        <div className={styles.carousel}>
            <button onClick={handlePrev} className={styles.navButton}>❮</button>
            <div className={styles.cards}>
            {visible.map((historia) => (
                <div key={historia.id} className={styles.card}>
                <Image
                    src={historia.img}
                    alt={historia.texto}
                    width={200}
                    height={140}
                    className={styles.image}
                />
                <p className={styles.text}>{historia.texto}</p>
                <button className={styles.button}>Doe Aqui!</button>
                </div>
            ))}
            </div>
            <button onClick={handleNext} className={styles.navButton}>❯</button>
        </div>
        </div>
    </section>
  );
}
