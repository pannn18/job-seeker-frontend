import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getJobs } from '../api/http'

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

export default function UserDashboard() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await getJobs()
      console.log('Jobs response:', response)
      
      // Backend kamu return { message, data }
      const jobsData = response.data
      setJobs(jobsData)
    } catch (err) {
      console.error('Error fetching jobs:', err)
      setError('Gagal memuat lowongan pekerjaan')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/')
  }

  // Format date helper
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
        <h1>User Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>Available Jobs</h2>

      {loading && <p>Loading jobs...</p>}
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && jobs.length === 0 && (
        <p>Belum ada lowongan pekerjaan tersedia.</p>
      )}

      {!loading && !error && jobs.length > 0 && (
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
                  📍 {job.company.address}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  📞 {job.company.phone}
                </p>
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
                <p><strong>Pendaftaran dibuka:</strong></p>
                <p>{formatDate(job.submissionStartDate)} - {formatDate(job.submissionEndDate)}</p>
              </div>

              <button 
                style={{ 
                  width: '100%',
                  padding: '0.75rem', 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}