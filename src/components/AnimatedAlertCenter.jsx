import React, { useState, useEffect } from 'react'
import { createAnimationStyle, animations, statCardAnimation } from '../utils/animations'

const AnimatedAlertCenter = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredAlert, setHoveredAlert] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // 预警统计数据
  const alertStats = [
    {
      title: '总预警数',
      value: 12,
      color: '#5aa8ff',
      icon: '⚠️'
    },
    {
      title: '严重预警',
      value: 5,
      color: '#ef4444',
      icon: '🔴'
    },
    {
      title: '已解决',
      value: 7,
      color: '#10b981',
      icon: '✅'
    },
    {
      title: '已忽略',
      value: 3,
      color: '#9ca3af',
      icon: '⏸️'
    }
  ]

  // 预警数据
  const alerts = [
    {
      id: 1,
      title: '项目延期风险预警',
      description: 'CRM系统重构项目预计延期3天，需要调整资源分配',
      level: 'urgent',
      status: 'active',
      time: '2024-01-15 14:30',
      owner: '张三',
      project: 'CRM系统重构',
      actions: ['标记已解决', '忽略预警']
    },
    {
      id: 2,
      title: '任务长期未更新',
      description: '"API接口开发"任务已7天未更新进度，请及时跟进',
      level: 'high',
      status: 'active',
      time: '2024-01-14 09:15',
      owner: '王五',
      project: 'API接口开发',
      actions: ['标记已解决', '忽略预警']
    },
    {
      id: 3,
      title: '里程碑即将到期',
      description: '"需求确认"里程碑将在2天后到期，请确保按时完成',
      level: 'medium',
      status: 'resolved',
      time: '2024-01-12 16:45',
      owner: '李四',
      project: '需求确认',
      actions: ['查看详情']
    }
  ]

  const getLevelColor = (level) => {
    const colors = {
      urgent: '#ef4444',
      high: '#f59e0b',
      medium: '#3b82f6',
      low: '#10b981'
    }
    return colors[level] || '#9ca3af'
  }

  const getLevelLabel = (level) => {
    const labels = {
      urgent: '严重',
      high: '高',
      medium: '中',
      low: '低'
    }
    return labels[level] || level
  }

  const getStatusColor = (status) => {
    const colors = {
      active: '#ef4444',
      resolved: '#10b981',
      ignored: '#9ca3af'
    }
    return colors[status] || '#9ca3af'
  }

  const getStatusLabel = (status) => {
    const labels = {
      active: '活跃',
      resolved: '已解决',
      ignored: '已忽略'
    }
    return labels[status] || status
  }

  // 筛选后的预警
  const filteredAlerts = alerts.filter(alert => {
    const matchesLevel = selectedLevel === 'all' || alert.level === selectedLevel
    const matchesStatus = selectedStatus === 'all' || alert.status === selectedStatus
    return matchesLevel && matchesStatus
  })

  return (
    <div style={{ padding: '2rem' }}>
      {/* 页面标题 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        ...createAnimationStyle(animations.fadeIn, isVisible)
      }}>
        <div>
          <h1 style={{ 
            fontSize: '2rem', 
            marginBottom: '0.5rem', 
            color: '#e6f0ff',
            fontWeight: '700'
          }}>
            预警中心
          </h1>
          <p style={{ color: '#9fb2d8', fontSize: '1rem' }}>
            智能预警和风险监控
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{
            padding: '0.5rem 1rem',
            background: 'rgba(239, 68, 68, 0.2)',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.3)'
            e.target.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.2)'
            e.target.style.transform = 'translateY(0)'
          }}
          >
            全部忽略
          </button>
          <button style={{
            padding: '0.5rem 1rem',
            background: 'linear-gradient(135deg, #5aa8ff, #3de0ff)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
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
            设置规则
          </button>
        </div>
      </div>

      {/* 预警统计 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        {alertStats.map((stat, index) => (
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
                width: '40px',
                height: '40px',
                background: `${stat.color}20`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === index ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
              }}>
                {stat.icon}
              </div>
              <div>
                <h3 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: stat.color, 
                  margin: '0 0 0.5rem 0',
                  transition: 'all 0.3s ease'
                }}>
                  {stat.value}
                </h3>
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

      {/* 预警列表 */}
      <div style={{ 
        background: '#0f1730', 
        border: '1px solid rgba(255,255,255,0.1)', 
        borderRadius: '12px', 
        overflow: 'hidden',
        ...createAnimationStyle(animations.fadeIn, isVisible),
        transitionDelay: '400ms'
      }}>
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#0c142a'
        }}>
          <h3 style={{ 
            color: '#e6f0ff', 
            fontSize: '1.1rem', 
            fontWeight: '600', 
            margin: 0 
          }}>
            预警列表
          </h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <select 
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                background: '#0f1730',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                color: '#e6f0ff',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <option value="all">全部级别</option>
              <option value="urgent">严重</option>
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                background: '#0f1730',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                color: '#e6f0ff',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <option value="all">全部状态</option>
              <option value="active">活跃</option>
              <option value="resolved">已解决</option>
              <option value="ignored">已忽略</option>
            </select>
          </div>
        </div>

        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {filteredAlerts.map((alert, index) => (
            <div
              key={alert.id}
              style={{
                padding: '1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                transition: 'all 0.3s ease',
                ...createAnimationStyle(animations.fadeIn, isVisible),
                transitionDelay: `${500 + index * 100}ms`,
                ...(hoveredAlert === alert.id ? {
                  background: 'rgba(255,255,255,0.02)',
                  transform: 'translateX(4px)'
                } : {})
              }}
              onMouseEnter={() => setHoveredAlert(alert.id)}
              onMouseLeave={() => setHoveredAlert(null)}
            >
              <div style={{ 
                width: '12px', 
                height: '12px', 
                background: getLevelColor(alert.level), 
                borderRadius: '50%', 
                marginTop: '0.25rem',
                flexShrink: 0,
                transition: 'all 0.3s ease',
                ...(hoveredAlert === alert.id ? {
                  transform: 'scale(1.2)',
                  boxShadow: `0 0 10px ${getLevelColor(alert.level)}50`
                } : {})
              }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  marginBottom: '0.5rem' 
                }}>
                  <div>
                    <h4 style={{ 
                      color: '#e6f0ff', 
                      fontSize: '1rem', 
                      fontWeight: '600', 
                      margin: '0 0 0.25rem 0',
                      transition: 'color 0.2s ease'
                    }}>
                      {alert.title}
                    </h4>
                    <p style={{ 
                      color: '#9fb2d8', 
                      fontSize: '0.9rem', 
                      margin: 0,
                      lineHeight: '1.4',
                      transition: 'color 0.2s ease'
                    }}>
                      {alert.description}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{ 
                      background: `${getLevelColor(alert.level)}20`, 
                      color: getLevelColor(alert.level), 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}>
                      {getLevelLabel(alert.level)}
                    </span>
                    <span style={{ 
                      background: `${getStatusColor(alert.status)}20`, 
                      color: getStatusColor(alert.status), 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}>
                      {getStatusLabel(alert.status)}
                    </span>
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '2rem', 
                  fontSize: '0.8rem', 
                  color: '#9fb2d8',
                  marginBottom: '1rem',
                  transition: 'color 0.2s ease'
                }}>
                  <span>📅 {alert.time}</span>
                  <span>👤 {alert.owner}</span>
                  <span>📁 {alert.project}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {alert.actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      style={{
                        padding: '0.5rem 1rem',
                        background: action === '标记已解决' 
                          ? 'rgba(16, 185, 129, 0.2)' 
                          : action === '忽略预警'
                          ? 'rgba(156, 163, 175, 0.2)'
                          : 'rgba(90, 168, 255, 0.2)',
                        color: action === '标记已解决' 
                          ? '#10b981' 
                          : action === '忽略预警'
                          ? '#9ca3af'
                          : '#5aa8ff',
                        border: `1px solid ${action === '标记已解决' 
                          ? 'rgba(16, 185, 129, 0.3)' 
                          : action === '忽略预警'
                          ? 'rgba(156, 163, 175, 0.3)'
                          : 'rgba(90, 168, 255, 0.3)'}`,
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-1px) scale(1.05)'
                        e.target.style.opacity = '0.9'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0) scale(1)'
                        e.target.style.opacity = '1'
                      }}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
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

export default AnimatedAlertCenter
