import React, { useState, useEffect } from 'react'
import { searchInputAnimation, buttonHoverAnimation } from '../utils/animations'

const AnimatedSearchFilter = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  departmentFilter,
  setDepartmentFilter
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isSearchHovered, setIsSearchHovered] = useState(false)
  const [isStatusHovered, setIsStatusHovered] = useState(false)
  const [isDeptHovered, setIsDeptHovered] = useState(false)
  const [searchAnimation, setSearchAnimation] = useState(false)

  // 搜索输入框动画效果
  useEffect(() => {
    if (searchTerm) {
      setSearchAnimation(true)
      const timer = setTimeout(() => setSearchAnimation(false), 300)
      return () => clearTimeout(timer)
    }
  }, [searchTerm])

  const searchInputStyle = {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    background: '#0f1730',
    border: isSearchFocused ? '2px solid #5aa8ff' : '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: '#e6f0ff',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ...(isSearchFocused ? searchInputAnimation.focus : searchInputAnimation.blur),
    ...(isSearchHovered && !isSearchFocused ? {
      borderColor: 'rgba(90, 168, 255, 0.5)',
      transform: 'scale(1.01)'
    } : {}),
    ...(searchAnimation ? {
      boxShadow: '0 0 0 3px rgba(90, 168, 255, 0.2)',
      transform: 'scale(1.02)'
    } : {})
  }

  const selectStyle = (isHovered) => ({
    padding: '0.75rem 1rem',
    background: '#0f1730',
    border: isHovered ? '2px solid #5aa8ff' : '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: '#e6f0ff',
    fontSize: '0.9rem',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.1)'
  })

  return (
    <div style={{ 
      display: 'flex', 
      gap: '1rem', 
      marginBottom: '2rem',
      alignItems: 'center'
    }}>
      {/* 搜索框 */}
      <div style={{ flex: 1, position: 'relative' }}>
        <input 
          type="text" 
          placeholder="搜索项目名称、负责人..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          onMouseEnter={() => setIsSearchHovered(true)}
          onMouseLeave={() => setIsSearchHovered(false)}
          style={searchInputStyle}
        />
        <span style={{ 
          position: 'absolute', 
          left: '0.75rem', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          color: isSearchFocused ? '#5aa8ff' : '#9fb2d8',
          fontSize: '1rem',
          transition: 'all 0.3s ease'
        }}>
          🔍
        </span>
        
        {/* 搜索清除按钮 */}
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              color: '#9fb2d8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(239, 68, 68, 0.2)'
              e.target.style.color = '#ef4444'
              e.target.style.transform = 'translateY(-50%) scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)'
              e.target.style.color = '#9fb2d8'
              e.target.style.transform = 'translateY(-50%) scale(1)'
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* 状态筛选 */}
      <select 
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        onMouseEnter={() => setIsStatusHovered(true)}
        onMouseLeave={() => setIsStatusHovered(false)}
        style={selectStyle(isStatusHovered)}
      >
        <option value="all">全部状态</option>
        <option value="active">进行中</option>
        <option value="completed">已完成</option>
        <option value="paused">已暂停</option>
        <option value="cancelled">已取消</option>
        <option value="delayed">延期</option>
      </select>

      {/* 部门筛选 */}
      <select 
        value={departmentFilter}
        onChange={(e) => setDepartmentFilter(e.target.value)}
        onMouseEnter={() => setIsDeptHovered(true)}
        onMouseLeave={() => setIsDeptHovered(false)}
        style={selectStyle(isDeptHovered)}
      >
        <option value="all">全部部门</option>
        <option value="技术部">技术部</option>
        <option value="产品部">产品部</option>
        <option value="运营部">运营部</option>
        <option value="设计部">设计部</option>
      </select>
    </div>
  )
}

export default AnimatedSearchFilter
