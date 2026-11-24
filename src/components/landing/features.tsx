import { Search, SlidersHorizontal, ClipboardList, UserRound } from "lucide-react";
import styles from "./features.module.scss";

interface FeaturesProps {
  onGetStarted?: () => void;
}

const features = [
  {
    id: "find",
    icon: Search,
    title: "Find Jobs That Fit You",
    text: "Discover openings from top companies, all in one place, and apply in a few clicks.",
    image: 'src/assets/bg1.svg',
    actions: true,
  },
  {
    id: "filters",
    icon: SlidersHorizontal,
    title: "Smart Filters",
    text: "Narrow down by role, location, and work type to see only what matters.",
    image: "",
    actions: false,
  },
  {
    id: "tracking",
    icon: ClipboardList,
    title: "Track Every Application",
    text: "Follow the status of each application without the guesswork.",
    image: "",
    actions: false,
  },
  {
    id: "profile",
    icon: UserRound,
    title: "Profile & CV",
    text: "Build your profile once, then apply to many roles in a few clicks.",
    image: "",
    actions: false,
  },
];

export default function Features({ onGetStarted }: FeaturesProps) {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.pill}>
            <span className={styles.pillDot} />
            // Our Features //
          </span>
          <div className={styles.title}>
            <h2>Everything you need to land your next role</h2>
          </div>
        </div>

        <div className={styles.grid}>
          {features.map(({ id, icon: Icon, title, text, image, actions }) => (
            <article key={id} className={`${styles.card} ${styles[id]}`}>
              <div className={styles.content}>
                <h4>{title}</h4>
                <p className={styles.text}>{text}</p>

                {actions && (
                  <div className={styles.actions}>
                    <button className={styles.btnDark} onClick={onGetStarted}>
                      Get Started
                    </button>
                    <a href="#how-it-works" className={styles.btnLight}>
                      Learn More
                    </a>
                  </div>
                )}
              </div>

              <div className={styles.media}>
                {image ? <img src={image} alt={title} /> : <Icon size={48} />}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}