import React, { useState, useEffect } from 'react'
import { createAnimationStyle, animations } from '../utils/animations'

const AnimatedEmptyState = ({ 
  icon = '📁', 
  title = '暂无项目', 
  description = '没有找到符合条件的项目，请调整筛选条件或创建新项目',
  actionText = '创建新项目',
  onAction = null 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isIconAnimated, setIsIconAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 200)
    
    const iconTimer = setTimeout(() => {
      setIsIconAnimated(true)
    }, 500)
    
    return () => {
      clearTimeout(timer)
      clearTimeout(iconTimer)
    }
  }, [])

  const containerStyle = {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '3rem',
    color: '#9fb2d8',
    ...createAnimationStyle(animations.fadeIn, isVisible)
  }

  const iconStyle = {
    fontSize: '4rem',
    marginBottom: '1rem',
    display: 'inline-block',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isIconAnimated ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-10deg)',
    opacity: isIconAnimated ? 1 : 0
  }

  const titleStyle = {
    color: '#e6f0ff',
    marginBottom: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    opacity: isVisible ? 1 : 0
  }

  const descriptionStyle = {
    marginBottom: '2rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    transition: 'all 0.3s ease',
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    opacity: isVisible ? 1 : 0,
    transitionDelay: '0.2s'
  }

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #5aa8ff, #3de0ff)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    opacity: isVisible ? 1 : 0,
    transitionDelay: '0.4s'
  }

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          .empty-state-icon {
            animation: float 3s ease-in-out infinite;
          }
          
          .empty-state-button:hover {
            animation: pulse 0.6s ease-in-out;
          }
        `}
      </style>
      
      <div style={containerStyle}>
        <div 
          style={iconStyle}
          className={isIconAnimated ? 'empty-state-icon' : ''}
        >
          {icon}
        </div>
        
        <h3 style={titleStyle}>
          {title}
        </h3>
        
        <p style={descriptionStyle}>
          {description}
        </p>
        
        {onAction && (
          <button
            onClick={onAction}
            style={buttonStyle}
            className="empty-state-button"
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.05)'
              e.target.style.boxShadow = '0 8px 25px rgba(90, 168, 255, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)'
              e.target.style.boxShadow = '0 4px 15px rgba(90, 168, 255, 0.2)'
            }}
          >
            {actionText}
          </button>
        )}
      </div>
    </>
  )
}

export default AnimatedEmptyState
