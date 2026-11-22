import { useEffect, useRef ,useState } from "react";
import type { CSSProperties } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  ClipboardList,
  UserRound,
} from "lucide-react";
import styles from "./features.module.scss";

const slides = [
  {
    icon: Search,
    title: "Find Jobs That Fit You",
    text: "Discover openings from top companies, all in one place.",
    image: "",
    stats: [
      { value: "10K+", label: "Active Jobs" },
      { value: "500+", label: "Companies" },
      { value: "24/7", label: "New Listings" },
    ],
  },
  {
    icon: SlidersHorizontal,
    title: "Smart Filters",
    text: "Narrow down by role, location, and work type to see only what matters.",
    image: "",
    stats: [
      { value: "3x", label: "Faster Search" },
      { value: "12", label: "Filter Options" },
      { value: "90%", label: "Relevant Results" },
    ],
  },
  {
    icon: ClipboardList,
    title: "Track Every Application",
    text: "Follow the status of each application without the guesswork.",
    image: "",
    stats: [
      { value: "1", label: "Dashboard" },
      { value: "5", label: "Status Steps" },
      { value: "0", label: "Lost Applications" },
    ],
  },
  {
    icon: UserRound,
    title: "Profile & CV",
    text: "Build your profile once, then apply to many roles in a few clicks.",
    image: "",
    stats: [
      { value: "1-click", label: "Apply" },
      { value: "5 min", label: "Profile Setup" },
      { value: "100%", label: "Reusable" },
    ],
  },
];

export default function Features() {
  const total = slides.length;
  const items = [...slides, ...slides, ...slides];

  const [pos, setPos] = useState(total);
  const [animate, setAnimate] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const realIndex = pos % total;

const isMoving = useRef(false);

const move = (delta: number) => {
  if (delta === 0 || isMoving.current) return;
  isMoving.current = true;
  window.setTimeout(() => {
    isMoving.current = false;
  }, 600);
  setAnimate(true);
  setPos((p) => p + delta);
};

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;

    if (pos >= total * 2) {
      setAnimate(false);
      setPos(pos - total);
    } else if (pos < total) {
      setAnimate(false);
      setPos(pos + total);
    }
  };

  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true))
    );
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) move(diff > 0 ? 1 : -1);
    setTouchStart(null);
  };

  return (
    <section id="features" className={styles.features}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.pill}>
            <span className={styles.pillDot} />
            // Our Features //
          </span>
          <div className={styles.title}>
            <h2>Everything you need to land your next role</h2>
          </div>
        </div>
      </div>

      <div className={styles.carousel}>
        <button
          className={`${styles.arrow} ${styles.prev}`}
          onClick={() => move(-1)}
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className={`${styles.arrow} ${styles.next}`}
          onClick={() => move(1)}
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>

        <div
          className={styles.viewport}
          onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`${styles.track} ${animate ? "" : styles.noTransition}`}
            style={{ "--index": pos } as CSSProperties}
            onTransitionEnd={handleTransitionEnd}
          >
            {items.map(({ icon: Icon, title, text, image, stats }, i) => {
              const distance = Math.abs(i - pos);
              const state =
                distance === 0
                  ? styles.active
                  : distance === 1
                  ? styles.near
                  : styles.far;

              return (
                <article
                  key={`${i}-${title}`}
                  className={`${styles.slide} ${state}`}
                  onClick={() => move(i - pos)}
                >
                  <div className={styles.media}>
                    {image ? <img src={image} alt={title} /> : <Icon size={64} />}
                  </div>

                  <div className={styles.body}>
                    <span className={styles.icon}>
                      <Icon size={24} />
                    </span>
                    <h4>{title}</h4>
                    <p className={styles.text}>{text}</p>

                    <ul className={styles.stats}>
                      {stats.map((stat) => (
                        <li key={stat.label}>
                          <strong>{stat.value}</strong>
                          <span>{stat.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className={styles.dots}>
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              className={i === realIndex ? styles.dotActive : styles.dot}
              onClick={() => move(i - realIndex)}
              aria-label={`Go to ${slide.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}