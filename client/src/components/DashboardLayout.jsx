import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardFooter from './DashboardFooter'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div>
      <DashboardHeader />
        <Outlet />
      <DashboardFooter />
    </div>
  )
}
