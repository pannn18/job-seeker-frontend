import { useState } from 'react'
import { loginUser, loginHRD } from '../../api/http'
import styles from './modal.module.scss'

interface LoginModalProps {
  onClose: () => void
  onSuccess: (role: 'user' | 'hrd') => void
  onSwitchToRegister: () => void
}

export default function LoginModal({ onClose, onSuccess, onSwitchToRegister }: LoginModalProps) {
  const [role, setRole] = useState<'user' | 'hrd'>('user')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const loginFunction = role === 'user' ? loginUser : loginHRD
      const response = await loginFunction({ email, password })

      localStorage.setItem('token', response.token)
      localStorage.setItem('role', role)

      if (response.user) {
        localStorage.setItem('userId', response.user.id)
      }
      if (response.user && response.user.companyId) {
        localStorage.setItem('companyId', response.user.companyId)
      }

      onSuccess(role)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login gagal. Cek email/password kamu.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>

        <div className={styles.tabs}>
          <button
            className={role === 'user' ? styles.tabActive : styles.tab}
            onClick={() => setRole('user')}
            type="button"
          >
            Job Seeker
          </button>
          <button
            className={role === 'hrd' ? styles.tabActive : styles.tab}
            onClick={() => setRole('hrd')}
            type="button"
          >
            HRD
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.buttonPrimary} type="submit" disabled={loading}>
            {loading ? (
              <span className={styles.loadingSpinner}>Loading...</span>
            ) : (
              `Login as ${role === 'user' ? 'Job Seeker' : 'HRD'}`
            )}
          </button>
        </form>

        <p className={styles.switchText}>
          Belum punya akun?{' '}
          <button
            className={styles.switchLink}
            type="button"
            onClick={onSwitchToRegister}
            disabled={loading}
          >
            Daftar
          </button>
        </p>

        <button className={styles.buttonSecondary} onClick={onClose} disabled={loading}>
          Close
        </button>
      </div>
    </div>
  )
}