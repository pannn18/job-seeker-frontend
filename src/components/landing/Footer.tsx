import logo from "../../assets/logo.svg";
import styles from "./footer.module.scss";

interface FooterProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const explore = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Footer({ onLoginClick, onRegisterClick }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#home">
              <img src={logo} alt="Careera" className={styles.logo} />
            </a>
            <p className={styles.tagline}>
              Connecting ambitious candidates with modern hiring teams through simple,
              transparent workflows.
            </p>
          </div>

          <nav className={styles.column} aria-label="Explore">
            <h6>Explore</h6>
            <ul>
              {explore.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.column}>
            <h6>Account</h6>
            <ul>
              <li>
                <button type="button" onClick={onLoginClick}>
                  Log In
                </button>
              </li>
              <li>
                <button type="button" onClick={onRegisterClick}>
                  Register
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Careera. All rights reserved.</p>
        </div>
        <p className={styles.wordmark} aria-hidden="true">
            Careera
        </p>
      </div>
    </footer>
  );
}