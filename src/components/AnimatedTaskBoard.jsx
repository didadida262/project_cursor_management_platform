import React, { useState, useEffect } from 'react'
import { createAnimationStyle, animations } from '../utils/animations'

const AnimatedTaskBoard = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredColumn, setHoveredColumn] = useState(null)
  const [hoveredTask, setHoveredTask] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // 任务数据
  const columns = [
    {
      id: 'todo',
      title: '待办',
      count: 3,
      color: '#9ca3af',
      tasks: [
        {
          id: 1,
          title: '用户登录功能开发',
          description: '实现用户登录、注册、密码重置功能',
          priority: 'high',
          assignee: '张三',
          estimatedTime: '8h',
          tags: ['前端', '认证']
        },
        {
          id: 2,
          title: '数据库设计',
          description: '设计用户表和权限表结构',
          priority: 'medium',
          assignee: '李四',
          estimatedTime: '4h',
          tags: ['数据库', '设计']
        }
      ]
    },
    {
      id: 'doing',
      title: '进行中',
      count: 2,
      color: '#3b82f6',
      tasks: [
        {
          id: 3,
          title: 'API接口开发',
          description: '开发用户管理相关API接口',
          priority: 'urgent',
          assignee: '王五',
          estimatedTime: '12h',
          tags: ['后端', 'API']
        }
      ]
    },
    {
      id: 'blocked',
      title: '阻塞',
      count: 1,
      color: '#ef4444',
      tasks: [
        {
          id: 4,
          title: '第三方集成',
          description: '等待第三方API文档更新',
          priority: 'medium',
          assignee: '赵六',
          estimatedTime: '6h',
          tags: ['集成', '外部']
        }
      ]
    },
    {
      id: 'done',
      title: '已完成',
      count: 4,
      color: '#10b981',
      tasks: [
        {
          id: 5,
          title: '需求分析',
          description: '完成项目需求文档编写',
          priority: 'high',
          assignee: '孙七',
          estimatedTime: '16h',
          tags: ['需求', '文档']
        }
      ]
    }
  ]

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: '#ef4444',
      high: '#f59e0b',
      medium: '#3b82f6',
      low: '#10b981'
    }
    return colors[priority] || '#9ca3af'
  }

  const getPriorityLabel = (priority) => {
    const labels = {
      urgent: '紧急',
      high: '高',
      medium: '中',
      low: '低'
    }
    return labels[priority] || priority
  }

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
            任务看板
          </h1>
          <p style={{ color: '#9fb2d8', fontSize: '1rem' }}>
            拖拽任务卡片来更新状态
          </p>
        </div>
        <button style={{
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
          + 新建任务
        </button>
      </div>

      {/* 看板列 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '1.5rem' 
      }}>
        {columns.map((column, columnIndex) => (
          <div
            key={column.id}
            style={{
              background: '#0f1730',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '1rem',
              minHeight: '500px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              ...createAnimationStyle(animations.fadeIn, isVisible),
              transitionDelay: `${columnIndex * 150}ms`,
              ...(hoveredColumn === columnIndex ? {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                borderColor: `${column.color}50`
              } : {})
            }}
            onMouseEnter={() => setHoveredColumn(columnIndex)}
            onMouseLeave={() => setHoveredColumn(null)}
          >
            {/* 列标题 */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '1rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ 
                width: '8px', 
                height: '8px', 
                background: column.color, 
                borderRadius: '50%' 
              }}></div>
              <h3 style={{ 
                color: '#e6f0ff', 
                fontSize: '1rem', 
                fontWeight: '600',
                margin: 0
              }}>
                {column.title}
              </h3>
              <span style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#9fb2d8',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}>
                {column.count}
              </span>
            </div>

            {/* 任务列表 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {column.tasks.map((task, taskIndex) => (
                <div
                  key={task.id}
                  style={{
                    background: '#1a2332',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '1rem',
                    cursor: 'move',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    ...createAnimationStyle(animations.fadeIn, isVisible),
                    transitionDelay: `${(columnIndex * 150) + (taskIndex * 100) + 200}ms`,
                    ...(hoveredTask === `${columnIndex}-${taskIndex}` ? {
                      transform: 'translateY(-2px) scale(1.02)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                      borderColor: `${column.color}50`
                    } : {})
                  }}
                  onMouseEnter={() => setHoveredTask(`${columnIndex}-${taskIndex}`)}
                  onMouseLeave={() => setHoveredTask(null)}
                >
                  {/* 任务标题 */}
                  <h4 style={{ 
                    color: '#e6f0ff', 
                    fontSize: '0.9rem', 
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    lineHeight: '1.3'
                  }}>
                    {task.title}
                  </h4>

                  {/* 任务描述 */}
                  <p style={{ 
                    color: '#9fb2d8', 
                    fontSize: '0.8rem', 
                    marginBottom: '0.75rem',
                    lineHeight: '1.4'
                  }}>
                    {task.description}
                  </p>

                  {/* 优先级和工时 */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    marginBottom: '0.75rem' 
                  }}>
                    <span style={{ 
                      background: `${getPriorityColor(task.priority)}20`, 
                      color: getPriorityColor(task.priority), 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.7rem',
                      fontWeight: '500'
                    }}>
                      {getPriorityLabel(task.priority)}
                    </span>
                    <span style={{ 
                      color: '#9fb2d8', 
                      fontSize: '0.7rem' 
                    }}>
                      {task.estimatedTime}
                    </span>
                  </div>

                  {/* 负责人和标签 */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem' 
                  }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      background: column.color, 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: 'white', 
                      fontSize: '0.7rem',
                      fontWeight: '500'
                    }}>
                      {task.assignee.charAt(0)}
                    </div>
                    <span style={{ 
                      color: '#9fb2d8', 
                      fontSize: '0.7rem' 
                    }}>
                      {task.assignee}
                    </span>
                  </div>

                  {/* 标签 */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '0.25rem', 
                    marginTop: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    {task.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          color: '#9fb2d8',
                          padding: '0.125rem 0.375rem',
                          borderRadius: '4px',
                          fontSize: '0.65rem',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {/* 空状态提示 */}
              {column.tasks.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem 1rem',
                  color: '#6b7280',
                  fontSize: '0.9rem',
                  fontStyle: 'italic',
                  border: '2px dashed rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.02)'
                }}>
                  拖拽任务到这里
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes taskPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
          
          .task-card-pulse {
            animation: taskPulse 0.6s ease-in-out;
          }
        `}
      </style>
    </div>
  )
}

export default AnimatedTaskBoard
