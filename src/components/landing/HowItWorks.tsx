import { useState } from "react";
import { UserPlus, FileText, Search, BadgeCheck } from "lucide-react";
import styles from "./howItWorks.module.scss";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    text: "Sign up in a minute and get access to your personal dashboard.",
    image: "",
  },
  {
    icon: FileText,
    title: "Build Your Profile and CV",
    text: "Add your experience and skills once, then reuse them for every application.",
    image: "",
  },
  {
    icon: Search,
    title: "Find and Apply",
    text: "Browse openings, filter what fits you, and send your application in a few clicks.",
    image: "",
  },
  {
    icon: BadgeCheck,
    title: "Track and Get Hired",
    text: "Follow every application status from your dashboard until you get the offer.",
    image: "",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const current = steps[active];
  const CurrentIcon = current.icon;

  return (
    <section id="how-it-works" className={styles.howItWorks}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.pill}>
            <span className={styles.pillDot} />
            // How It Works //
          </span>
          <div className={styles.title}>
            <h2>Get started in a few simple steps</h2>
            <p className={styles.subtitle}>
              From sign up to your first offer, everything is clear and simple.
            </p>
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.media}>
            {current.image ? (
              <img src={current.image} alt={current.title} />
            ) : (
              <CurrentIcon size={64} />
            )}
          </div>

          <div className={styles.steps}>
            {steps.map(({ icon: Icon, title, text }, i) => (
              <button
                key={title}
                type="button"
                className={`${styles.step} ${i === active ? styles.stepActive : ""}`}
                onClick={() => setActive(i)}
              >
                <span className={styles.stepIcon}>
                  <Icon size={22} />
                </span>
                <span className={styles.stepBody}>
                  <h5>{title}</h5>
                  <p>{text}</p>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}