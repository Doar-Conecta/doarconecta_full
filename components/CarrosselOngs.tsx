"use client";

import styles from './CarrosselOngs.module.css';
import { useState } from 'react';
import Image from 'next/image';

const ongs = [
  { id: 1, nome: 'SOS Mata Atlântica', img: '/ongs/sos.png' },
  { id: 2, nome: 'Santa Casa Diadema', img: '/ongs/santacasa.png' },
  { id: 3, nome: 'AACD', img: '/ongs/aacd.png' },
  { id: 4, nome: 'Casa Durval Paiva', img: '/ongs/durval.png' },
  { id: 5, nome: 'CACC São Vicente', img: '/ongs/cacc.png' },
  { id: 6, nome: 'SOS Mata Atlântica', img: '/ongs/sos.png' },
  { id: 7, nome: 'Santa Casa Diadema', img: '/ongs/santacasa.png' },
  { id: 8, nome: 'AACD', img: '/ongs/aacd.png' },
  { id: 9, nome: 'Casa Durval Paiva', img: '/ongs/durval.png' },
  { id: 10, nome: 'CACC São Vicente', img: '/ongs/cacc.png' },
  { id: 11, nome: 'SOS Mata Atlântica', img: '/ongs/sos.png' },
  { id: 12, nome: 'Santa Casa Diadema', img: '/ongs/santacasa.png' },
  { id: 13, nome: 'AACD', img: '/ongs/aacd.png' },
  { id: 14, nome: 'Casa Durval Paiva', img: '/ongs/durval.png' },
  { id: 15, nome: 'CACC São Vicente', img: '/ongs/cacc.png' },
];

export default function CarrosselOngs() {
  const [startIndex, setStartIndex] = useState(0);

  const visibleItems = ongs.slice(startIndex, startIndex + 6);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + 6 < ongs.length) setStartIndex(startIndex + 1);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>ONGs Disponíveis Para Doação</h2>
      <div className={styles.carousel}>
        <button onClick={handlePrev} className={styles.navButton}>❮</button>
        <div className={styles.cards}>
          {visibleItems.map((ong) => (
            <div key={ong.id} className={styles.card}>
              <Image
                src={ong.img}
                alt={ong.nome}
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
        <button onClick={handleNext} className={styles.navButton}>❯</button>
      </div>
    </section>
  );
}
