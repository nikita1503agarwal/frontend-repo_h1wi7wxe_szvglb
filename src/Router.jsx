import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './Landing'
import App from './App'
import Test from './Test'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<App />} />
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
