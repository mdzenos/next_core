'use client'

import React, { useEffect } from 'react'

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function RootError({ error, reset }: ErrorProps) {
  // Log lỗi ra console mỗi khi lỗi thay đổi
  useEffect(() => {
    console.error('Global app error caught:', error)
  }, [error])

  return (
    <div style={{
      padding: 24,
      backgroundColor: '#ffe6e6',
      color: '#900',
      borderRadius: 8,
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      maxWidth: 600,
      margin: '50px auto',
      textAlign: 'center',
      boxShadow: '0 0 10px rgba(255,0,0,0.2)'
    }}>
      <h1 style={{ fontWeight: 'bold', marginBottom: 12 }}>Có lỗi xảy ra, vui lòng thử lại sau!</h1>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          borderRadius: 5,
          border: 'none',
          backgroundColor: '#900',
          color: '#fff',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: 16,
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b00')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#900')}
      >
        Thử lại
      </button>
    </div>
  )
}
