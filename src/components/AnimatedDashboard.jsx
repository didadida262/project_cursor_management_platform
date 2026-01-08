import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { createAnimationStyle, animations, statCardAnimation } from '../utils/animations'

const AnimatedDashboard = () => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // 仪表盘统计数据
  const dashboardStats = [
    {
      title: t('dashboard.totalProjects'),
      value: 8,
      change: '+12%',
      changeType: 'positive',
      color: '#5aa8ff',
      icon: '📊'
    },
    {
      title: t('dashboard.projectsInProgress'),
      value: 3,
      change: '+5%',
      changeType: 'positive',
      color: '#3ddc97',
      icon: '🔄'
    },
    {
      title: t('dashboard.completedProjects'),
      value: 4,
      change: '+8%',
      changeType: 'positive',
      color: '#10b981',
      icon: '✅'
    },
    {
      title: t('dashboard.alertQuantity'),
      value: 2,
      change: '-3%',
      changeType: 'negative',
      color: '#ef4444',
      icon: '⚠️'
    }
  ]

  // 最近项目数据
  const recentProjects = [
    { name: 'CRM系统重构', progress: 65, status: 'active', priority: 'high' },
    { name: '移动端App开发', progress: 30, status: 'active', priority: 'medium' },
    { name: '数据分析平台', progress: 100, status: 'completed', priority: 'high' },
    { name: '用户界面优化', progress: 45, status: 'paused', priority: 'low' }
  ]

  // 预警数据
  const alerts = [
    { type: 'urgent', message: t('alerts.expectedDelay', { days: 3 }), time: t('dashboard.hoursAgo', { count: 2 }) },
    { type: 'warning', message: t('alerts.taskNotUpdated', { days: 7 }), time: t('dashboard.hoursAgo', { count: 4 }) },
    { type: 'info', message: t('alerts.milestoneExpiring', { days: 2 }), time: t('dashboard.daysAgo', { count: 1 }) }
  ]

  const getStatusColor = (status) => {
    const colors = {
      active: '#5aa8ff',
      completed: '#10b981',
      paused: '#f59e0b',
      cancelled: '#ef4444'
    }
    return colors[status] || '#9ca3af'
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    }
    return colors[priority] || '#9ca3af'
  }

  const getAlertColor = (type) => {
    const colors = {
      urgent: '#ef4444',
      warning: '#f59e0b',
      info: '#5aa8ff'
    }
    return colors[type] || '#9ca3af'
  }

  return (
    <div style={{ padding: '2rem' }}>
      {/* 页面标题 */}
      <div style={{
        marginBottom: '2rem',
        ...createAnimationStyle(animations.fadeIn, isVisible)
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          marginBottom: '0.5rem', 
          color: '#e6f0ff',
          fontWeight: '700'
        }}>
          {t('dashboard.title')}
        </h1>
        <p style={{ color: '#9fb2d8', fontSize: '1rem' }}>
          {t('dashboard.subtitle')}
        </p>
      </div>

      {/* 统计卡片 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        {dashboardStats.map((stat, index) => (
          <div
            key={stat.title}
            style={{
              background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
              border: `1px solid ${stat.color}30`,
              borderRadius: '12px',
              padding: '1.5rem',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              ...createAnimationStyle(animations.fadeIn, isVisible),
              transitionDelay: `${index * 100}ms`,
              ...(hoveredCard === index ? statCardAnimation.hover : statCardAnimation.normal)
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* 背景光效 */}
            {hoveredCard === index && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at 50% 50%, ${stat.color}15, transparent)`,
                transition: 'opacity 0.3s ease'
              }}></div>
            )}

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: `${stat.color}20`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === index ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
              }}>
                {stat.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'baseline', 
                  gap: '0.5rem',
                  marginBottom: '0.25rem'
                }}>
                  <h3 style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    color: stat.color, 
                    margin: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    {stat.value}
                  </h3>
                  <span style={{
                    fontSize: '0.8rem',
                    color: stat.changeType === 'positive' ? '#10b981' : '#ef4444',
                    background: stat.changeType === 'positive' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    fontWeight: '500'
                  }}>
                    {stat.change}
                  </span>
                </div>
                <p style={{ 
                  color: '#9fb2d8', 
                  margin: 0,
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  {stat.title}
                </p>
              </div>
            </div>

            {/* 悬停时的装饰线条 */}
            {hoveredCard === index && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)`,
                borderRadius: '0 0 12px 12px',
                animation: 'slideIn 0.3s ease-out'
              }}></div>
            )}
          </div>
        ))}
      </div>

      {/* 内容区域 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '2rem' 
      }}>
        {/* 最近项目 */}
        <div style={{
          background: '#0f1730',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '1.5rem',
          ...createAnimationStyle(animations.slideIn, isVisible),
          transitionDelay: '400ms'
        }}>
          <h3 style={{ 
            color: '#e6f0ff', 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📋 {t('dashboard.recentProjects')}
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentProjects.map((project, index) => (
              <div
                key={project.name}
                style={{
                  padding: '1rem',
                  background: '#0c142a',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'translateY(0)',
                  ...createAnimationStyle(animations.fadeIn, isVisible),
                  transitionDelay: `${500 + index * 100}ms`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.background = '#1a2332'
                  e.currentTarget.style.borderColor = 'rgba(90, 168, 255, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.background = '#0c142a'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '0.75rem'
                }}>
                  <h4 style={{ 
                    color: '#e6f0ff', 
                    fontSize: '1rem', 
                    fontWeight: '500',
                    margin: 0
                  }}>
                    {project.name}
                  </h4>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: getStatusColor(project.status)
                    }}></span>
                    <span style={{
                      fontSize: '0.8rem',
                      color: getPriorityColor(project.priority),
                      background: `${getPriorityColor(project.priority)}20`,
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px'
                    }}>
                      {project.priority}
                    </span>
                  </div>
                </div>
                
                <div style={{ marginBottom: '0.5rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '0.25rem' 
                  }}>
                    <span style={{ color: '#9fb2d8', fontSize: '0.8rem' }}>{t('common.progress')}</span>
                    <span style={{ 
                      color: getStatusColor(project.status), 
                      fontSize: '0.8rem', 
                      fontWeight: '600' 
                    }}>
                      {project.progress}%
                    </span>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '4px', 
                    background: 'rgba(255,255,255,0.1)', 
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${project.progress}%`, 
                      height: '100%', 
                      background: `linear-gradient(135deg, ${getStatusColor(project.status)}, ${getStatusColor(project.status)}88)`,
                      borderRadius: '2px',
                      transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 预警中心 */}
        <div style={{
          background: '#0f1730',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '1.5rem',
          ...createAnimationStyle(animations.slideIn, isVisible),
          transitionDelay: '600ms'
        }}>
          <h3 style={{ 
            color: '#e6f0ff', 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ⚠️ {t('common.alertCenter')}
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {alerts.map((alert, index) => (
              <div
                key={index}
                style={{
                  padding: '1rem',
                  background: '#0c142a',
                  border: `1px solid ${getAlertColor(alert.type)}30`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  ...createAnimationStyle(animations.fadeIn, isVisible),
                  transitionDelay: `${700 + index * 100}ms`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)'
                  e.currentTarget.style.borderColor = getAlertColor(alert.type)
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.borderColor = `${getAlertColor(alert.type)}30`
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '0.75rem' 
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: getAlertColor(alert.type),
                    marginTop: '0.25rem',
                    flexShrink: 0
                  }}></div>
                  <div style={{ flex: 1 }}>
                    <p style={{ 
                      color: '#e6f0ff', 
                      fontSize: '0.9rem', 
                      margin: '0 0 0.25rem 0',
                      lineHeight: '1.4'
                    }}>
                      {alert.message}
                    </p>
                    <span style={{ 
                      color: '#9fb2d8', 
                      fontSize: '0.8rem' 
                    }}>
                      {alert.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(-20px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  )
}

export default AnimatedDashboard
