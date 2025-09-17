import React, { useState, useEffect } from 'react'
import { createAnimationStyle, animations } from '../utils/animations'

const DraggableTaskBoard = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredColumn, setHoveredColumn] = useState(null)
  const [hoveredTask, setHoveredTask] = useState(null)
  const [draggedTask, setDraggedTask] = useState(null)
  const [dragOverColumn, setDragOverColumn] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // 任务数据 - 使用状态管理
  const [columns, setColumns] = useState([
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
        },
        {
          id: 3,
          title: 'API文档编写',
          description: '编写RESTful API接口文档',
          priority: 'low',
          assignee: '王五',
          estimatedTime: '6h',
          tags: ['文档', 'API']
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
          id: 4,
          title: 'API接口开发',
          description: '开发用户管理相关API接口',
          priority: 'urgent',
          assignee: '王五',
          estimatedTime: '12h',
          tags: ['后端', 'API']
        },
        {
          id: 5,
          title: '前端页面开发',
          description: '开发用户管理相关页面',
          priority: 'high',
          assignee: '赵六',
          estimatedTime: '10h',
          tags: ['前端', '页面']
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
          id: 6,
          title: '第三方集成',
          description: '等待第三方API文档更新',
          priority: 'medium',
          assignee: '孙七',
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
          id: 7,
          title: '需求分析',
          description: '完成项目需求文档编写',
          priority: 'high',
          assignee: '周八',
          estimatedTime: '16h',
          tags: ['需求', '文档']
        },
        {
          id: 8,
          title: '技术选型',
          description: '确定技术栈和架构方案',
          priority: 'medium',
          assignee: '吴九',
          estimatedTime: '8h',
          tags: ['技术', '架构']
        },
        {
          id: 9,
          title: '环境搭建',
          description: '搭建开发环境和CI/CD流程',
          priority: 'high',
          assignee: '郑十',
          estimatedTime: '12h',
          tags: ['环境', 'CI/CD']
        },
        {
          id: 10,
          title: '代码审查',
          description: '建立代码审查规范和流程',
          priority: 'medium',
          assignee: '钱十一',
          estimatedTime: '4h',
          tags: ['规范', '流程']
        }
      ]
    }
  ])

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

  // 拖拽开始
  const handleDragStart = (e, task, sourceColumnId) => {
    setDraggedTask({ ...task, sourceColumnId })
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.target.outerHTML)
    
    // 添加拖拽样式
    e.target.style.opacity = '0.5'
    e.target.style.transform = 'rotate(5deg) scale(1.05)'
    e.target.style.transition = 'none' // 禁用过渡动画
  }

  // 拖拽结束
  const handleDragEnd = (e) => {
    // 重置所有拖拽样式
    e.target.style.opacity = '1'
    e.target.style.transform = 'rotate(0deg) scale(1)'
    e.target.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' // 恢复过渡动画
    
    // 立即清理状态
    setDraggedTask(null)
    setDragOverColumn(null)
  }

  // 拖拽取消
  const handleDragCancel = (e) => {
    // 重置所有拖拽样式
    e.target.style.opacity = '1'
    e.target.style.transform = 'rotate(0deg) scale(1)'
    e.target.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    
    // 清理状态
    setDraggedTask(null)
    setDragOverColumn(null)
  }

  // 拖拽进入列
  const handleDragEnter = (e, columnId) => {
    e.preventDefault()
    setDragOverColumn(columnId)
  }

  // 拖拽在列上移动
  const handleDragOver = (e, columnId) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverColumn(columnId)
  }

  // 拖拽离开列
  const handleDragLeave = (e) => {
    // 只有当真正离开列容器时才清除高亮
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumn(null)
    }
  }

  // 放置任务
  const handleDrop = (e, targetColumnId) => {
    e.preventDefault()
    
    if (!draggedTask || draggedTask.sourceColumnId === targetColumnId) {
      setDragOverColumn(null)
      return
    }

    // 更新任务状态
    setColumns(prevColumns => {
      const newColumns = [...prevColumns]
      
      // 从源列移除任务
      const sourceColumn = newColumns.find(col => col.id === draggedTask.sourceColumnId)
      const targetColumn = newColumns.find(col => col.id === targetColumnId)
      
      if (sourceColumn && targetColumn) {
        // 移除任务
        sourceColumn.tasks = sourceColumn.tasks.filter(task => task.id !== draggedTask.id)
        sourceColumn.count = sourceColumn.tasks.length
        
        // 添加任务到目标列
        targetColumn.tasks.push({
          ...draggedTask,
          sourceColumnId: undefined
        })
        targetColumn.count = targetColumn.tasks.length
      }
      
      return newColumns
    })

    // 立即清理拖拽状态
    setDraggedTask(null)
    setDragOverColumn(null)
  }

  // 添加新任务
  const handleAddTask = (columnId) => {
    const newTask = {
      id: Date.now(),
      title: '新任务',
      description: '点击编辑任务描述',
      priority: 'medium',
      assignee: '未分配',
      estimatedTime: '0h',
      tags: ['新任务']
    }

    setColumns(prevColumns => {
      const newColumns = [...prevColumns]
      const targetColumn = newColumns.find(col => col.id === columnId)
      
      if (targetColumn) {
        targetColumn.tasks.push(newTask)
        targetColumn.count = targetColumn.tasks.length
      }
      
      return newColumns
    })
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
              border: dragOverColumn === column.id 
                ? `2px dashed ${column.color}` 
                : '1px solid rgba(255,255,255,0.1)',
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
              } : {}),
              ...(dragOverColumn === column.id ? {
                background: `${column.color}10`,
                transform: 'scale(1.02)',
                boxShadow: `0 8px 25px ${column.color}30`
              } : {})
            }}
            onMouseEnter={() => setHoveredColumn(columnIndex)}
            onMouseLeave={() => setHoveredColumn(null)}
            onDragEnter={(e) => handleDragEnter(e, column.id)}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
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
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, column.id)}
                  onDragEnd={handleDragEnd}
                  onDragCancel={handleDragCancel}
                  style={{
                    background: '#1a2332',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '1rem',
                    cursor: 'move',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    ...createAnimationStyle(animations.fadeIn, isVisible),
                    transitionDelay: `${(columnIndex * 150) + (taskIndex * 100) + 200}ms`,
                    ...(hoveredTask === `${columnIndex}-${taskIndex}` && !draggedTask ? {
                      transform: 'translateY(-2px) scale(1.02)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                      borderColor: `${column.color}50`
                    } : {}),
                    // 移除拖拽时的内联样式，避免冲突
                    ...(draggedTask?.id === task.id ? {
                      opacity: 0.3,
                      transform: 'rotate(5deg) scale(1.05)',
                      transition: 'none'
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
                  border: dragOverColumn === column.id 
                    ? `2px dashed ${column.color}` 
                    : '2px dashed rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  background: dragOverColumn === column.id 
                    ? `${column.color}10` 
                    : 'rgba(255,255,255,0.02)',
                  transition: 'all 0.3s ease'
                }}>
                  {dragOverColumn === column.id ? '释放任务到这里' : '拖拽任务到这里'}
                </div>
              )}

              {/* 添加任务按钮 */}
              <button
                onClick={() => handleAddTask(column.id)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px dashed rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: '#9fb2d8',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  transition: 'all 0.3s ease',
                  marginTop: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.1)'
                  e.target.style.borderColor = 'rgba(255,255,255,0.3)'
                  e.target.style.color = '#e6f0ff'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.05)'
                  e.target.style.borderColor = 'rgba(255,255,255,0.2)'
                  e.target.style.color = '#9fb2d8'
                }}
              >
                + 添加任务
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 拖拽提示 */}
      {draggedTask && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.9)',
          color: '#e6f0ff',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          fontSize: '0.9rem',
          zIndex: 1000,
          pointerEvents: 'none',
          animation: 'pulse 1s infinite',
          border: '1px solid rgba(90, 168, 255, 0.3)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
        }}>
          🎯 拖拽任务到目标列来改变状态
        </div>
      )}

      <style>
        {`
          @keyframes taskPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          
          .task-card-pulse {
            animation: taskPulse 0.6s ease-in-out;
          }
        `}
      </style>
    </div>
  )
}

export default DraggableTaskBoard
