import React from 'react'
import './index.css'
import { Sidebar } from './components/Layout/Sidebar.jsx'
import { Header } from './components/Layout/Header.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { ProjectManagement } from './pages/ProjectManagement.jsx'
import { TaskBoard } from './pages/TaskBoard.jsx'
import { GanttChart } from './pages/GanttChart.jsx'
import { AlertCenter } from './pages/AlertCenter.jsx'
import { useAppStore } from './store'

export default function App() {
  const { currentPage } = useAppStore()

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'projects':
        return <ProjectManagement />
      case 'tasks':
        return <TaskBoard />
      case 'gantt':
        return <GanttChart />
      case 'alerts':
        return <AlertCenter />
      case 'reports':
        return <div className="p-6">报表分析页面（开发中）</div>
      case 'users':
        return <div className="p-6">用户管理页面（开发中）</div>
      case 'settings':
        return <div className="p-6">系统设置页面（开发中）</div>
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  )
}