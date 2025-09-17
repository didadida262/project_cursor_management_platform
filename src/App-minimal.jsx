import React from 'react'

export default function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0b1020', 
      color: '#e6f0ff',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>项目任务管理系统</h1>
      <p style={{ color: '#9fb2d8', marginBottom: '2rem' }}>欢迎使用项目任务管理系统</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1rem' 
      }}>
        <div style={{ 
          background: '#0f1730', 
          border: '1px solid rgba(255,255,255,0.1)', 
          borderRadius: '12px', 
          padding: '1.5rem' 
        }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>项目管理</h2>
          <p style={{ color: '#9fb2d8' }}>创建、管理和跟踪项目进度</p>
        </div>
        
        <div style={{ 
          background: '#0f1730', 
          border: '1px solid rgba(255,255,255,0.1)', 
          borderRadius: '12px', 
          padding: '1.5rem' 
        }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>任务看板</h2>
          <p style={{ color: '#9fb2d8' }}>拖拽式任务管理，状态流转</p>
        </div>
        
        <div style={{ 
          background: '#0f1730', 
          border: '1px solid rgba(255,255,255,0.1)', 
          borderRadius: '12px', 
          padding: '1.5rem' 
        }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>甘特图</h2>
          <p style={{ color: '#9fb2d8' }}>时间线视图，任务依赖关系</p>
        </div>
        
        <div style={{ 
          background: '#0f1730', 
          border: '1px solid rgba(255,255,255,0.1)', 
          borderRadius: '12px', 
          padding: '1.5rem' 
        }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>预警中心</h2>
          <p style={{ color: '#9fb2d8' }}>智能预警，风险监控</p>
        </div>
      </div>
    </div>
  )
}
