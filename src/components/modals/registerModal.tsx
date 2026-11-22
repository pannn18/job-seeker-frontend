import { useState } from 'react'
import { registerUser, registerHRD } from '../../api/http'
import styles from './Modal.module.scss'

interface RegisterModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function RegisterModal({ onClose, onSuccess }: RegisterModalProps) {
  const [role, setRole] = useState<'user' | 'hrd'>('user')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Register User fields
  const [registerUserData, setRegisterUserData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    role: 'Society',
    dateOfBirth: '',
    gender: 'Male'
  })

  // Register HRD fields
  const [registerHRDData, setRegisterHRDData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    companyAddress: '',
    role: 'HRD',
    companyPhone: '',
    companyDescription: ''
  })

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (role === 'user') {
        const response = await registerUser(registerUserData)
        console.log('Register user success:', response)
      } else {
        const response = await registerHRD(registerHRDData)
        console.log('Register HRD success:', response)
      }
      
      alert('Register berhasil! Silakan login.')
      onSuccess()
    } catch (err) {
      console.error('Register error:', err)
      
      // Coba parse error message dari backend
      let errorMessage = 'Register gagal. Coba lagi.'
      
      if (err instanceof Error) {
        try {
          const errorData = JSON.parse(err.message)
          errorMessage = errorData.message || errorMessage
        } catch {
          errorMessage = err.message || errorMessage
        }
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Register</h2>
        
        {/* Tabs: Job Seeker / HRD */}
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

        {/* Form Register Job Seeker */}
        {role === 'user' && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              placeholder="Full Name"
              value={registerUserData.name}
              onChange={(e) => setRegisterUserData({ ...registerUserData, name: e.target.value })}
              required
              disabled={loading}
            />
            
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={registerUserData.email}
              onChange={(e) => setRegisterUserData({ ...registerUserData, email: e.target.value })}
              required
              disabled={loading}
            />
            
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={registerUserData.password}
              onChange={(e) => setRegisterUserData({ ...registerUserData, password: e.target.value })}
              required
              disabled={loading}
            />
            
            <input
              className={styles.input}
              type="text"
              placeholder="Address"
              value={registerUserData.address}
              onChange={(e) => setRegisterUserData({ ...registerUserData, address: e.target.value })}
              required
              disabled={loading}
            />
            
            <input
              className={styles.input}
              type="date"
              placeholder="Date of Birth"
              value={registerUserData.dateOfBirth}
              onChange={(e) => setRegisterUserData({ ...registerUserData, dateOfBirth: e.target.value })}
              required
              disabled={loading}
            />

            <input
              className={styles.input}
              type="tel"
              placeholder="Phone Number"
              value={registerUserData.phone}
              onChange={(e) => setRegisterUserData({ ...registerUserData, phone: e.target.value })}
              required
              disabled={loading}
            />
            
            <select
              className={styles.select}
              value={registerUserData.gender}
              onChange={(e) => setRegisterUserData({ ...registerUserData, gender: e.target.value })}
              required
              disabled={loading}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            
            {error && <p className={styles.error}>{error}</p>}
            
            <button className={styles.buttonPrimary} type="submit" disabled={loading}>
              {loading ? (
                <span className={styles.loadingSpinner}>Registering...</span>
              ) : (
                'Register as Job Seeker'
              )}
            </button>
          </form>
        )}

        {/* Form Register HRD */}
        {role === 'hrd' && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              placeholder="Name"
              value={registerHRDData.name}
              onChange={(e) => setRegisterHRDData({ ...registerHRDData, name: e.target.value })}
              required
              disabled={loading}
            />
            
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={registerHRDData.email}
              onChange={(e) => setRegisterHRDData({ ...registerHRDData, email: e.target.value })}
              required
              disabled={loading}
            />
            
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={registerHRDData.password}
              onChange={(e) => setRegisterHRDData({ ...registerHRDData, password: e.target.value })}
              required
              disabled={loading}
            />
            
            <input
              className={styles.input}
              type="text"
              placeholder="Company Name"
              value={registerHRDData.companyName}
              onChange={(e) => setRegisterHRDData({ ...registerHRDData, companyName: e.target.value })}
              required
              disabled={loading}
            />
            
            <input
              className={styles.input}
              type="text"
              placeholder="Company Address"
              value={registerHRDData.companyAddress}
              onChange={(e) => setRegisterHRDData({ ...registerHRDData, companyAddress: e.target.value })}
              required
              disabled={loading}
            />
            
            <input
              className={styles.input}
              type="tel"
              placeholder="Company Phone"
              value={registerHRDData.companyPhone}
              onChange={(e) => setRegisterHRDData({ ...registerHRDData, companyPhone: e.target.value })}
              required
              disabled={loading}
            />
            
            <input
              className={styles.input}
              type="text"
              placeholder="Company Description"
              value={registerHRDData.companyDescription}
              onChange={(e) => setRegisterHRDData({ ...registerHRDData, companyDescription: e.target.value })}
              required
              disabled={loading}
            />
            
            {error && <p className={styles.error}>{error}</p>}
            
            <button className={styles.buttonPrimary} type="submit" disabled={loading}>
              {loading ? (
                <span className={styles.loadingSpinner}>Registering...</span>
              ) : (
                'Register as HRD'
              )}
            </button>
          </form>
        )}
        
        <button className={styles.buttonSecondary} onClick={onClose} disabled={loading}>
          Close
        </button>
      </div>
    </div>
  )
}