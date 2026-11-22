import styles from "./navbar.module.scss";

interface NavbarProps {
  onLoginClick: () => void;
}

const links = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar({ onLoginClick }: NavbarProps) {
  return (
    <header className={styles.wrapper}>
      <nav className={styles.navbar}>
        <a href="#home" className={styles.logo}>
          <span className={styles.logoMark} />
          Careera
        </a>

        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <button className={styles.login} onClick={onLoginClick}>
          Log In
        </button>
      </nav>
    </header>
  );
}