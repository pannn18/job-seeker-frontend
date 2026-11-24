import type { CSSProperties } from "react";
import { UserRound } from "lucide-react";
import styles from "./testimonials.module.scss";

interface TestimonialsProps {
  onGetStarted?: () => void;
}

const columns = [
  { top: 3, tiles: [{ image: "src/assets/testimonial-12.jpg" }, { image: "src/assets/testimonial-10.jpg" }] },
  { top: 0, tiles: [{ image: "src/assets/testimonial-13.jpg" }, { image: "src/assets/testimonial-7.jpg" }] },
  { top: 3.5, tiles: [{ image: "src/assets/testimonial-6.jpg" }] },
  { top: 0.5, tiles: [{ image: "src/assets/testimonial-3.jpg" }] },
  { top: 2, tiles: [{ image: "src/assets/testimonial-1.jpg" }] },
  { top: 0.5, tiles: [{ image: "src/assets/testimonial-2.jpg" }] },
  { top: 3.5, tiles: [{ image: "src/assets/testimonial-4.jpg" }] },
  { top: 0, tiles: [{ image: "src/assets/testimonial-5.jpg" }, { image: "src/assets/testimonial-11.jpg" }] },
  { top: 3, tiles: [{ image: "src/assets/testimonial-8.jpg" }, { image: "src/assets/testimonial-9.jpg" }] },
];

export default function Testimonials({ onGetStarted }: TestimonialsProps) {
  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.stage}>
          <div className={styles.wall} aria-hidden="true">
            {columns.map((column, c) => (
              <div
                key={c}
                className={styles.column}
                style={{ "--top": `${column.top}rem` } as CSSProperties}
              >
                {column.tiles.map((tile, t) => (
                  <div key={t} className={styles.tile}>
                    {tile.image ? (
                      <img src={tile.image} alt="" />
                    ) : (
                      <UserRound size={32} />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.content}>
            <span className={styles.pill}>
              <span className={styles.pillDot} />
              // Testimonials //
            </span>

            <h2 className={styles.title}>
              Join people finding
              <span className={styles.muted}>their next opportunity</span>
            </h2>

            <p className={styles.subtitle}>
              Job seekers and hiring teams use Careera to connect faster and with less hassle.
            </p>

            <button className={styles.cta} onClick={onGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}