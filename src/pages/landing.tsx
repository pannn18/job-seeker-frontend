import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './landing.module.scss'
import LoginModal from '../components/modals/loginModal'
import RegisterModal from '../components/modals/registerModal'
import Navbar from '../components/landing/navbar'
import Features from '../components/landing/features'
import HowItWorks from '../components/landing/HowItWorks'
import Testimonials from '../components/landing/Testimonials'
import Footer from '../components/landing/Footer'

export default function Landing() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const navigate = useNavigate()

  const handleLoginSuccess = (role: 'user' | 'hrd') => {
    setShowLoginModal(false)
    navigate(role === 'user' ? '/user/dashboard' : '/hrd/dashboard')
  }

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false)
    setShowLoginModal(true)
  }

  const handleSwitchToRegister = () => {
    setShowLoginModal(false)
    setShowRegisterModal(true)
  }

  return (
    <div className={styles.landing}>
      <Navbar onLoginClick={() => setShowLoginModal(true)} />

      <section id="home" className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            Find Your <span className={styles.mutedText}>Next Career</span> <br />
            &amp; <span className={styles.mutedText}>Strategic Talent</span> Partners <br />
            From Today
          </h1>

        <p className={styles.subtitle}>
          Connect ambitious candidates with modern hiring teams through structured roles,
          transparent matching, and faster workflows.
        </p>

          <div className={styles.actions}>
            <button
              className={styles.ctaPrimary}
              onClick={() => setShowRegisterModal(true)}>
              Get Started
            </button>
            <a href="#features" className={styles.ctaSecondary}>
              Learn More
            </a>
          </div>
        </div>
      </section>

      <Features onGetStarted={() => setShowRegisterModal(true)} />
      <HowItWorks />
      <Testimonials onGetStarted={() => setShowRegisterModal(true)} />
      <Footer
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
      />

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}

      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onSuccess={handleRegisterSuccess}
        />
      )}
    </div>
  )
}