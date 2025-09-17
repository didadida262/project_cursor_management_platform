import React, { useState, useEffect } from 'react'
import { statCardAnimation, createAnimationStyle, animations } from '../utils/animations'

const AnimatedStatCard = ({ 
  title, 
  value, 
  color, 
  icon, 
  index,
  isVisible = true 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimated, setIsAnimated] = useState(false)

  // 数字动画效果
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsAnimated(true)
      }, index * 150) // 错开动画时间
      return () => clearTimeout(timer)
    }
  }, [isVisible, index])

  const cardStyle = {
    background: `linear-gradient(135deg, ${color}20, ${color}10)`,
    border: `1px solid ${color}30`,
    borderRadius: '12px',
    padding: '1.5rem',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    ...createAnimationStyle(animations.fadeIn, isVisible),
    ...(isHovered ? statCardAnimation.hover : statCardAnimation.normal)
  }

  // 数字动画样式
  const numberStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: color,
    margin: '0 0 0.5rem 0',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isAnimated ? 'scale(1)' : 'scale(0.8)',
    opacity: isAnimated ? 1 : 0
  }

  // 图标动画样式
  const iconStyle = {
    width: '40px',
    height: '40px',
    background: `${color}20`,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
  }

  // 背景光效
  const backgroundEffectStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 50% 50%, ${color}10, transparent)`,
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.3s ease'
  }

  return (
    <>
      <style>
        {`
          @keyframes numberCountUp {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          
          @keyframes iconBounce {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.1) rotate(5deg); }
          }
          
          .stat-card-number {
            animation: numberCountUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .stat-card-icon {
            animation: iconBounce 0.8s ease-in-out;
          }
        `}
      </style>
      
      <div 
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 背景光效 */}
        <div style={backgroundEffectStyle}></div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div 
            style={iconStyle}
            className={isAnimated ? 'stat-card-icon' : ''}
          >
            {icon}
          </div>
          <div>
            <h3 
              style={numberStyle}
              className={isAnimated ? 'stat-card-number' : ''}
            >
              {value}
            </h3>
            <p style={{ 
              color: '#9fb2d8', 
              margin: 0,
              fontSize: '0.9rem',
              transition: 'color 0.2s ease'
            }}>
              {title}
            </p>
          </div>
        </div>
        
        {/* 悬停时的装饰线条 */}
        {isHovered && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            borderRadius: '0 0 12px 12px',
            animation: 'slideIn 0.3s ease-out'
          }}></div>
        )}
      </div>
    </>
  )
}

export default AnimatedStatCard
