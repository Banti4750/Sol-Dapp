'use client'

import React from 'react'

export default function Layout({ children }) {
  return (
    <div style={{
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      minHeight: '100vh',
      backgroundImage: 'url("./aseset/Dapp-bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      {children}
    </div>
  )
}