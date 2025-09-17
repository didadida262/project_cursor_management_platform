import React, { useState } from 'react'
import { useProjects } from './hooks/useProjects'
import ProjectModal from './components/ProjectModal'
import DeleteConfirm from './components/DeleteConfirm'
import AnimatedProjectCard from './components/AnimatedProjectCard'
import AnimatedSearchFilter from './components/AnimatedSearchFilter'
import AnimatedStatCard from './components/AnimatedStatCard'
import AnimatedEmptyState from './components/AnimatedEmptyState'
import AnimatedDashboard from './components/AnimatedDashboard'
import AnimatedTaskBoard from './components/AnimatedTaskBoard'
import DraggableTaskBoard from './components/DraggableTaskBoard'
import SimpleDraggableTaskBoard from './components/SimpleDraggableTaskBoard'
import AnimatedGanttChart from './components/AnimatedGanttChart'
import AnimatedAlertCenter from './components/AnimatedAlertCenter'

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  
  // 项目管理相关状态和逻辑
  const {
    projects,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    departmentFilter,
    setDepartmentFilter,
    showCreateModal,
    setShowCreateModal,
    editingProject,
    setEditingProject,
    showDeleteConfirm,
    setShowDeleteConfirm,
    stats,
    createProject,
    updateProject,
    deleteProject,
    getStatusColor,
    getStatusLabel
  } = useProjects()

  const menuItems = [
    { id: 'dashboard', label: '仪表盘', icon: '📊' },
    { id: 'projects', label: '项目管理', icon: '📁' },
    { id: 'tasks', label: '任务看板', icon: '📋' },
    { id: 'gantt', label: '甘特图', icon: '📈' },
    { id: 'alerts', label: '预警中心', icon: '⚠️' },
    { id: 'reports', label: '报表分析', icon: '📊' },
    { id: 'users', label: '用户管理', icon: '👥' },
    { id: 'settings', label: '系统设置', icon: '⚙️' },
  ]

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AnimatedDashboard />
      case 'projects':
        return (
          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#e6f0ff' }}>项目管理</h1>
                <p style={{ color: '#9fb2d8' }}>创建和管理项目</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#e6f0ff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}>
                  📊 报表视图
                </button>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #5aa8ff, #3de0ff)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateY(0)',
                    boxShadow: '0 4px 15px rgba(90, 168, 255, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px) scale(1.05)'
                    e.target.style.boxShadow = '0 8px 25px rgba(90, 168, 255, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)'
                    e.target.style.boxShadow = '0 4px 15px rgba(90, 168, 255, 0.3)'
                  }}
                >
                  + 新建项目
                </button>
              </div>
            </div>

            {/* 项目统计 */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '1rem', 
              marginBottom: '2rem' 
            }}>
              <AnimatedStatCard
                title="总项目数"
                value={stats.total}
                color="#5aa8ff"
                icon="📊"
                index={0}
              />
              <AnimatedStatCard
                title="进行中"
                value={stats.active}
                color="#3ddc97"
                icon="🔄"
                index={1}
              />
              <AnimatedStatCard
                title="已完成"
                value={stats.completed}
                color="#10b981"
                icon="✅"
                index={2}
              />
              <AnimatedStatCard
                title="延期"
                value={stats.delayed}
                color="#ef4444"
                icon="⚠️"
                index={3}
              />
            </div>

            {/* 搜索和筛选 */}
            <AnimatedSearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              departmentFilter={departmentFilter}
              setDepartmentFilter={setDepartmentFilter}
            />
            
            {/* 项目列表 */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {projects.map((project, index) => (
                <AnimatedProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onEdit={setEditingProject}
                  onDelete={setShowDeleteConfirm}
                  getStatusColor={getStatusColor}
                  getStatusLabel={getStatusLabel}
                />
              ))}
              
              {projects.length === 0 && (
                <AnimatedEmptyState
                  icon="📁"
                  title="暂无项目"
                  description="没有找到符合条件的项目，请调整筛选条件或创建新项目"
                  actionText="创建新项目"
                  onAction={() => setShowCreateModal(true)}
                />
              )}
            </div>
          </div>
        )
      case 'tasks':
        return <SimpleDraggableTaskBoard />
      case 'gantt':
        return <AnimatedGanttChart />
      case 'alerts':
        return <AnimatedAlertCenter />
      default:
        return (
          <div style={{ padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#e6f0ff' }}>{menuItems.find(item => item.id === currentPage)?.label}</h1>
            <p style={{ color: '#9fb2d8' }}>功能开发中...</p>
          </div>
        )
    }
  }

  return (
    <div style={{ 
      width: '100vw',
      height: '100vh', 
      background: '#0b1020', 
      color: '#e6f0ff',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      margin: 0,
      padding: 0,
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      {/* 左侧菜单栏 */}
      <div style={{ 
        width: '260px',
        background: '#0f1730',
        borderRight: '1px solid rgba(255,255,255,0.1)',
        padding: '1.5rem 0',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto'
      }}>
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#e6f0ff' }}>项目管理系统</h1>
        </div>
        
        <nav style={{ padding: '0 1rem' }}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                marginBottom: '0.25rem',
                background: currentPage === item.id ? 'rgba(90, 168, 255, 0.2)' : 'transparent',
                border: currentPage === item.id ? '1px solid rgba(90, 168, 255, 0.3)' : '1px solid transparent',
                borderRadius: '8px',
                color: currentPage === item.id ? '#5aa8ff' : '#9fb2d8',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== item.id) {
                  e.target.style.background = 'rgba(255,255,255,0.1)'
                  e.target.style.color = '#e6f0ff'
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== item.id) {
                  e.target.style.background = 'transparent'
                  e.target.style.color = '#9fb2d8'
                }
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 右侧内容区域 */}
      <div style={{ 
        marginLeft: '260px',
        flex: 1,
        minHeight: '100vh',
        background: '#0b1020'
      }}>
        {/* 顶部导航栏 */}
        <div style={{ 
          height: '64px',
          background: '#0c142a',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#e6f0ff' }}>
            {menuItems.find(item => item.id === currentPage)?.label}
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: 'linear-gradient(135deg, #5aa8ff, #3de0ff)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              U
            </div>
          </div>
        </div>

        {/* 主内容区域 */}
        <main style={{ 
          flex: 1,
          overflowY: 'auto'
        }}>
          {renderContent()}
        </main>
      </div>
      
      {/* 项目创建/编辑模态框 */}
      <ProjectModal
        isOpen={showCreateModal || editingProject !== null}
        onClose={() => {
          setShowCreateModal(false)
          setEditingProject(null)
        }}
        onSubmit={(projectData) => {
          if (editingProject) {
            updateProject(editingProject.id, projectData)
          } else {
            createProject(projectData)
          }
        }}
        project={editingProject}
        isEdit={editingProject !== null}
      />
      
      {/* 删除确认对话框 */}
      <DeleteConfirm
        isOpen={showDeleteConfirm !== null}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => {
          if (showDeleteConfirm) {
            deleteProject(showDeleteConfirm.id)
          }
        }}
        projectName={showDeleteConfirm?.name || ''}
      />
    </div>
  )
}
