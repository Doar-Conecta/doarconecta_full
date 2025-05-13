'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Quem somos', href: '/quemsomos' },
    { name: 'Doações Disponíveis', href: '/doacoes-disponiveis' },
    { name: 'Minhas Doações', href: '/doacoes' },
  ];

  return (
    <header id='header'>
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logoLink}>
                <img src="/doarconecta-logo.png" alt="Logo" className={styles.logoImage} />
                <div className={styles.logoName}>Doar Conecta</div>
            </Link>
        <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={styles.menuButton}
        >
            ☰
        </button>
            <div className={styles.containerNav}>
        <ul className={`${styles.navList} ${menuOpen ? styles.navListOpen : ''}`}>
            {navLinks.map((link) => (
            <li key={link.href}>
                <Link href={link.href}>
                <span className={`${styles.navItem} ${pathname === link.href ? styles.activeNavItem : ''}`}>
                    {link.name}
                </span>
                </Link>
            </li>
            ))}
        </ul>
            <Link href="/login">
                <button className={styles.loginButton}>
                    Entrar
                </button>
            </Link>

            </div>
        </nav>

    </header>
  );
}
