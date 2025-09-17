import React, { useState, useEffect } from 'react'
import { animations, createAnimationStyle, getCardAnimationDelay, buttonHoverAnimation } from '../utils/animations'

const AnimatedProjectCard = ({ 
  project, 
  index, 
  onEdit, 
  onDelete, 
  getStatusColor, 
  getStatusLabel 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isEditHovered, setIsEditHovered] = useState(false)
  const [isDeleteHovered, setIsDeleteHovered] = useState(false)

  // 卡片进入动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, getCardAnimationDelay(index))
    
    return () => clearTimeout(timer)
  }, [index])

  // 卡片样式
  const cardStyle = {
    background: '#0f1730',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '1.5rem',
    position: 'relative',
    cursor: 'pointer',
    ...createAnimationStyle(animations.fadeIn, isVisible),
    ...(isHovered ? {
      transform: 'translateY(-4px) scale(1.02)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
      borderColor: 'rgba(90, 168, 255, 0.3)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    } : {
      transform: 'translateY(0) scale(1)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      borderColor: 'rgba(255,255,255,0.1)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    })
  }

  // 进度条动画
  const progressBarStyle = {
    width: '100%',
    height: '6px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '3px',
    overflow: 'hidden',
    position: 'relative'
  }

  const progressFillStyle = {
    width: `${project.progress}%`,
    height: '100%',
    background: `linear-gradient(135deg, ${getStatusColor(project.status)}, ${getStatusColor(project.status)}88)`,
    borderRadius: '3px',
    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden'
  }

  // 进度条光效
  const progressShineStyle = {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    animation: 'progressShine 2s infinite'
  }

  return (
    <>
      <style>
        {`
          @keyframes progressShine {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          
          @keyframes cardPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
          
          .project-card-pulse {
            animation: cardPulse 0.6s ease-in-out;
          }
        `}
      </style>
      
      <div 
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={isVisible ? 'project-card-pulse' : ''}
      >
        {/* 项目头部 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: '1rem' 
        }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
              marginBottom: '0.5rem', 
              color: '#e6f0ff',
              transition: 'color 0.2s ease'
            }}>
              {project.name}
            </h3>
            <p style={{ 
              color: '#9fb2d8', 
              fontSize: '0.9rem', 
              margin: 0,
              transition: 'color 0.2s ease'
            }}>
              {project.department} • {project.owner}
            </p>
          </div>
          
          {/* 操作按钮 */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                onEdit(project)
              }}
              onMouseEnter={() => setIsEditHovered(true)}
              onMouseLeave={() => setIsEditHovered(false)}
              style={{
                padding: '0.5rem',
                background: isEditHovered ? 'rgba(90, 168, 255, 0.2)' : 'rgba(255,255,255,0.1)',
                color: isEditHovered ? '#5aa8ff' : '#9fb2d8',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transform: isEditHovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✏️
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                onDelete(project)
              }}
              onMouseEnter={() => setIsDeleteHovered(true)}
              onMouseLeave={() => setIsDeleteHovered(false)}
              style={{
                padding: '0.5rem',
                background: isDeleteHovered ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)',
                color: '#ef4444',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transform: isDeleteHovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              🗑️
            </button>
          </div>
        </div>
        
        {/* 项目描述 */}
        <p style={{ 
          color: '#9fb2d8', 
          marginBottom: '1.5rem', 
          fontSize: '0.9rem',
          lineHeight: '1.5',
          transition: 'color 0.2s ease'
        }}>
          {project.description}
        </p>
        
        {/* 进度条 */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '0.5rem' 
          }}>
            <span style={{ 
              color: '#9fb2d8', 
              fontSize: '0.8rem',
              transition: 'color 0.2s ease'
            }}>
              进度
            </span>
            <span style={{ 
              color: getStatusColor(project.status), 
              fontSize: '0.8rem', 
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}>
              {project.progress}%
            </span>
          </div>
          <div style={progressBarStyle}>
            <div style={progressFillStyle}>
              <div style={progressShineStyle}></div>
            </div>
          </div>
        </div>
        
        {/* 状态和时间 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '1rem' 
        }}>
          <span style={{ 
            background: `${getStatusColor(project.status)}20`, 
            color: getStatusColor(project.status), 
            padding: '0.25rem 0.75rem', 
            borderRadius: '12px', 
            fontSize: '0.8rem',
            transition: 'all 0.2s ease'
          }}>
            {getStatusLabel(project.status)}
          </span>
          <span style={{ 
            color: '#9fb2d8', 
            fontSize: '0.8rem',
            transition: 'color 0.2s ease'
          }}>
            {project.startDate} ~ {project.endDate}
          </span>
        </div>
        
        {/* 项目统计 */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          fontSize: '0.8rem', 
          color: '#9fb2d8',
          transition: 'color 0.2s ease'
        }}>
          <span>👥 {project.members}人</span>
          <span>📋 {project.tasks}任务</span>
          <span style={{
            color: project.alerts > 0 ? '#ef4444' : '#10b981',
            transition: 'color 0.2s ease'
          }}>
            {project.alerts > 0 ? `⚠️ ${project.alerts}预警` : '✅ 正常'}
          </span>
        </div>
      </div>
    </>
  )
}

export default AnimatedProjectCard
