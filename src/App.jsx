import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t, i18n } = useTranslation()
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const languageDropdownRef = useRef(null)

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setLanguageDropdownOpen(false)
      }
    }

    if (languageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [languageDropdownOpen])
  
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
    { id: 'dashboard', labelKey: 'common.dashboard', icon: '📊' },
    { id: 'projects', labelKey: 'common.projectManagement', icon: '📁' },
    { id: 'tasks', labelKey: 'common.taskBoard', icon: '📋' },
    { id: 'gantt', labelKey: 'common.ganttChart', icon: '📈' },
    { id: 'alerts', labelKey: 'common.alertCenter', icon: '⚠️' },
    { id: 'users', labelKey: 'common.userManagement', icon: '👥' },
  ]

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    setLanguageDropdownOpen(false)
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AnimatedDashboard />
      case 'projects':
        return (
          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#e6f0ff' }}>{t('projects.title')}</h1>
                <p style={{ color: '#9fb2d8' }}>{t('projects.subtitle')}</p>
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
                  📊 {t('projects.reportView')}
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
                  + {t('common.newProject')}
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
                title={t('projects.totalProjects')}
                value={stats.total}
                color="#5aa8ff"
                icon="📊"
                index={0}
              />
              <AnimatedStatCard
                title={t('projects.inProgress')}
                value={stats.active}
                color="#3ddc97"
                icon="🔄"
                index={1}
              />
              <AnimatedStatCard
                title={t('projects.completed')}
                value={stats.completed}
                color="#10b981"
                icon="✅"
                index={2}
              />
              <AnimatedStatCard
                title={t('projects.delayed')}
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
                  title={t('common.noProjects')}
                  description={t('common.noProjectsDescription')}
                  actionText={t('common.createNewProject')}
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
      case 'users':
        return (
          <div style={{ padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#e6f0ff' }}>{t('users.title')}</h1>
            <p style={{ color: '#9fb2d8', marginBottom: '2rem' }}>{t('users.subtitle')}</p>
            <div style={{ 
              background: '#0f1730', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '12px', 
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👥</div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#e6f0ff' }}>{t('users.userManagementFeatures')}</h2>
              <p style={{ color: '#9fb2d8', marginBottom: '2rem' }}>{t('users.userManagementDescription')}</p>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem',
                marginTop: '2rem'
              }}>
                <div style={{ 
                  background: 'rgba(90, 168, 255, 0.1)', 
                  border: '1px solid rgba(90, 168, 255, 0.2)', 
                  borderRadius: '8px', 
                  padding: '1rem' 
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                  <h3 style={{ color: '#e6f0ff', marginBottom: '0.5rem' }}>{t('users.userStatistics')}</h3>
                  <p style={{ color: '#9fb2d8', fontSize: '0.9rem' }}>{t('users.userStatisticsDescription')}</p>
                </div>
                <div style={{ 
                  background: 'rgba(90, 168, 255, 0.1)', 
                  border: '1px solid rgba(90, 168, 255, 0.2)', 
                  borderRadius: '8px', 
                  padding: '1rem' 
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>➕</div>
                  <h3 style={{ color: '#e6f0ff', marginBottom: '0.5rem' }}>{t('users.addUser')}</h3>
                  <p style={{ color: '#9fb2d8', fontSize: '0.9rem' }}>{t('users.addUserDescription')}</p>
                </div>
                <div style={{ 
                  background: 'rgba(90, 168, 255, 0.1)', 
                  border: '1px solid rgba(90, 168, 255, 0.2)', 
                  borderRadius: '8px', 
                  padding: '1rem' 
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✏️</div>
                  <h3 style={{ color: '#e6f0ff', marginBottom: '0.5rem' }}>{t('users.editUser')}</h3>
                  <p style={{ color: '#9fb2d8', fontSize: '0.9rem' }}>{t('users.editUserDescription')}</p>
                </div>
                <div style={{ 
                  background: 'rgba(90, 168, 255, 0.1)', 
                  border: '1px solid rgba(90, 168, 255, 0.2)', 
                  borderRadius: '8px', 
                  padding: '1rem' 
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
                  <h3 style={{ color: '#e6f0ff', marginBottom: '0.5rem' }}>{t('users.searchFilter')}</h3>
                  <p style={{ color: '#9fb2d8', fontSize: '0.9rem' }}>{t('users.searchFilterDescription')}</p>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div style={{ padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#e6f0ff' }}>{t(menuItems.find(item => item.id === currentPage)?.labelKey || 'common.dashboard')}</h1>
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
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#e6f0ff' }}>{t('common.projectManagementSystem')}</h1>
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
              {t(item.labelKey)}
            </button>
          ))}
        </nav>
      </div>

      {/* 右侧内容区域 */}
      <div style={{ 
        marginLeft: '260px',
        flex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
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
          padding: '0 2rem',
          flexShrink: 0
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#e6f0ff' }}>
            {t(menuItems.find(item => item.id === currentPage)?.labelKey || 'common.dashboard')}
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
            {/* 语言选择下拉框 */}
            <div style={{ position: 'relative' }} ref={languageDropdownRef}>
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#e6f0ff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.1)'
                }}
              >
                <span>🌐</span>
                <span>{i18n.language === 'zh' ? t('common.chinese') : t('common.english')}</span>
                <span style={{ fontSize: '0.7rem' }}>▼</span>
              </button>
              
              {languageDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '0.5rem',
                  background: '#0f1730',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  minWidth: '120px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  zIndex: 1000
                }}>
                  <button
                    onClick={() => changeLanguage('zh')}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: i18n.language === 'zh' ? 'rgba(90, 168, 255, 0.2)' : 'transparent',
                      color: i18n.language === 'zh' ? '#5aa8ff' : '#e6f0ff',
                      border: 'none',
                      borderRadius: '8px 8px 0 0',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (i18n.language !== 'zh') {
                        e.target.style.background = 'rgba(255,255,255,0.1)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (i18n.language !== 'zh') {
                        e.target.style.background = 'transparent'
                      }
                    }}
                  >
                    {t('common.chinese')}
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: i18n.language === 'en' ? 'rgba(90, 168, 255, 0.2)' : 'transparent',
                      color: i18n.language === 'en' ? '#5aa8ff' : '#e6f0ff',
                      border: 'none',
                      borderRadius: '0 0 8px 8px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (i18n.language !== 'en') {
                        e.target.style.background = 'rgba(255,255,255,0.1)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (i18n.language !== 'en') {
                        e.target.style.background = 'transparent'
                      }
                    }}
                  >
                    {t('common.english')}
                  </button>
                </div>
              )}
            </div>
            
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
          overflowY: 'auto',
          overflowX: 'hidden'
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
