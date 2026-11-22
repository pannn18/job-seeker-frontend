import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getHRDPositions, addPosition } from '../api/http'

interface Company {
  id: number
  name: string
  address: string
  phone: string
  description: string
  userId: number
}

interface Job {
  id: number
  positionName: string
  capacity: number
  description: string
  submissionStartDate: string
  submissionEndDate: string
  companyId: number
  company: Company
}

export default function HRDDashboard() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    positionName: '',
    capacity: 1,
    description: '',
    submissionStartDate: '',
    submissionEndDate: ''
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
  try {
    setLoading(true)
    const response = await getHRDPositions()
    console.log('HRD Jobs response:', response)
    
    const allJobs = response.data || []
    
    // ← TAMBAHIN FILTER INI
    // Get current user/company info
    const userId = localStorage.getItem('userId')
    const companyId = localStorage.getItem('companyId')
    
    console.log('Current userId:', userId)
    console.log('Current companyId:', companyId)
    
    // Filter jobs by company
    let filteredJobs = allJobs
    
    if (companyId) {
      // Filter by companyId
      filteredJobs = allJobs.filter((job: Job) => 
        job.companyId.toString() === companyId
      )
    } else if (userId) {
      // Kalau gak ada companyId, filter by company.userId
      filteredJobs = allJobs.filter((job: Job) => 
        job.company.userId.toString() === userId
      )
    }
    
    console.log('Filtered jobs:', filteredJobs)
    
    setJobs(filteredJobs)
  } catch (err) {
    console.error('Error fetching jobs:', err)
    setError('Gagal memuat lowongan')
  } finally {
    setLoading(false)
  }
}

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      // Convert dates to ISO format
      const payload = {
        ...formData,
        submissionStartDate: new Date(formData.submissionStartDate).toISOString(),
        submissionEndDate: new Date(formData.submissionEndDate).toISOString()
      }

      await addPosition(payload)
      
      alert('Lowongan berhasil ditambahkan!')
      
      // Reset form
      setFormData({
        positionName: '',
        capacity: 1,
        description: '',
        submissionStartDate: '',
        submissionEndDate: ''
      })
      
      setShowAddForm(false)
      
      // Refresh list
      fetchJobs()
    } catch (err) {
      console.error('Error adding position:', err)
      const errorMessage = err instanceof Error ? err.message : 'Gagal menambahkan lowongan'
      setError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>HRD Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          {showAddForm ? 'Cancel' : '+ Add New Position'}
        </button>
      </div>

      {showAddForm && (
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2>Add New Position</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                Position Name *
              </label>
              <input
                type="text"
                value={formData.positionName}
                onChange={(e) => setFormData({ ...formData, positionName: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                Capacity *
              </label>
              <input
                type="number"
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                Submission Start Date *
              </label>
              <input
                type="date"
                value={formData.submissionStartDate}
                onChange={(e) => setFormData({ ...formData, submissionStartDate: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                Submission End Date *
              </label>
              <input
                type="date"
                value={formData.submissionEndDate}
                onChange={(e) => setFormData({ ...formData, submissionEndDate: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button 
              type="submit" 
              disabled={submitting}
              style={{
                padding: '0.75rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                opacity: submitting ? 0.6 : 1
              }}
            >
              {submitting ? 'Adding...' : 'Add Position'}
            </button>
          </form>
        </div>
      )}

      <h2>My Posted Positions</h2>

      {loading && <p>Loading positions...</p>}
      
      {error && !showAddForm && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && jobs.length === 0 && (
        <p>Belum ada lowongan yang diposting.</p>
      )}

      {!loading && jobs.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {jobs.map((job) => (
            <div 
              key={job.id} 
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1.5rem',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ marginBottom: '0.5rem' }}>{job.positionName}</h3>
              <p style={{ color: '#007bff', fontWeight: 600, marginBottom: '1rem' }}>
                {job.company.name}
              </p>
              
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  👥 Kapasitas: {job.capacity} orang
                </p>
              </div>

              <p style={{ 
                color: '#333', 
                fontSize: '0.9rem', 
                marginBottom: '1rem',
                lineHeight: '1.5'
              }}>
                {job.description}
              </p>

              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '0.75rem', 
                borderRadius: '4px',
                marginBottom: '1rem',
                fontSize: '0.85rem'
              }}>
                <p><strong>Pendaftaran:</strong></p>
                <p>{formatDate(job.submissionStartDate)} - {formatDate(job.submissionEndDate)}</p>
              </div>

              <button 
                style={{ 
                  width: '100%',
                  padding: '0.75rem', 
                  backgroundColor: '#ffc107', 
                  color: '#000', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Edit Position
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}