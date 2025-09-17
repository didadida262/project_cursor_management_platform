import React, { useState, useEffect } from 'react'
import { createAnimationStyle, animations } from '../utils/animations'

const AnimatedGanttChart = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [selectedView, setSelectedView] = useState('project')

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // 甘特图数据
  const ganttData = [
    {
      id: 1,
      name: 'CRM系统重构',
      type: 'project',
      owner: '张三',
      status: 'active',
      progress: 65,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      tasks: [
        {
          id: 11,
          name: '需求分析',
          owner: '张三',
          status: 'completed',
          progress: 100,
          startDate: '2024-01-15',
          endDate: '2024-01-25',
          duration: 10
        },
        {
          id: 12,
          name: 'UI设计',
          owner: '李四',
          status: 'active',
          progress: 80,
          startDate: '2024-01-20',
          endDate: '2024-02-10',
          duration: 21
        },
        {
          id: 13,
          name: '前端开发',
          owner: '王五',
          status: 'pending',
          progress: 0,
          startDate: '2024-02-05',
          endDate: '2024-03-05',
          duration: 28
        }
      ]
    },
    {
      id: 2,
      name: '移动端App开发',
      type: 'project',
      owner: '李四',
      status: 'active',
      progress: 30,
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      tasks: [
        {
          id: 21,
          name: '需求确认',
          owner: '李四',
          status: 'completed',
          progress: 100,
          startDate: '2024-02-01',
          endDate: '2024-02-15',
          duration: 14
        },
        {
          id: 22,
          name: '原型设计',
          owner: '赵六',
          status: 'active',
          progress: 60,
          startDate: '2024-02-10',
          endDate: '2024-03-01',
          duration: 20
        }
      ]
    }
  ]

  const getStatusColor = (status) => {
    const colors = {
      completed: '#10b981',
      active: '#3b82f6',
      pending: '#f59e0b',
      blocked: '#ef4444'
    }
    return colors[status] || '#9ca3af'
  }

  const getStatusLabel = (status) => {
    const labels = {
      completed: '已完成',
      active: '进行中',
      pending: '待开始',
      blocked: '阻塞'
    }
    return labels[status] || status
  }

  // 计算时间轴位置
  const getTimelinePosition = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    const daysFromStart = Math.ceil((now - start) / (1000 * 60 * 60 * 24))
    
    return {
      left: Math.max(0, (daysFromStart / totalDays) * 100),
      width: Math.min(100, (totalDays / 30) * 100) // 假设30天为100%宽度
    }
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
            甘特图
          </h1>
          <p style={{ color: '#9fb2d8', fontSize: '1rem' }}>
            项目时间线和任务依赖关系
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select 
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              background: '#0f1730',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#e6f0ff',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <option value="project">按项目查看</option>
            <option value="owner">按负责人查看</option>
            <option value="department">按部门查看</option>
          </select>
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
            导出甘特图
          </button>
        </div>
      </div>

      {/* 甘特图主体 */}
      <div style={{ 
        background: '#0f1730', 
        border: '1px solid rgba(255,255,255,0.1)', 
        borderRadius: '12px', 
        overflow: 'hidden',
        ...createAnimationStyle(animations.fadeIn, isVisible),
        transitionDelay: '200ms'
      }}>
        {/* 时间轴头部 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '200px 1fr', 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          background: '#0c142a'
        }}>
          <div style={{ 
            padding: '1rem', 
            borderRight: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <h3 style={{ 
              color: '#e6f0ff', 
              fontSize: '1rem', 
              fontWeight: '600',
              margin: 0
            }}>
              任务/项目
            </h3>
          </div>
          <div style={{ padding: '1rem' }}>
            <div style={{ 
              display: 'flex', 
              gap: '2rem', 
              fontSize: '0.8rem', 
              color: '#9fb2d8',
              justifyContent: 'space-between'
            }}>
              <span>2024年1月</span>
              <span>2024年2月</span>
              <span>2024年3月</span>
              <span>2024年4月</span>
            </div>
          </div>
        </div>

        {/* 甘特图内容 */}
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {ganttData.map((item, itemIndex) => (
            <div key={item.id}>
              {/* 项目行 */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '200px 1fr',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(90, 168, 255, 0.05)',
                transition: 'all 0.3s ease',
                ...createAnimationStyle(animations.slideIn, isVisible),
                transitionDelay: `${300 + itemIndex * 100}ms`
              }}>
                <div style={{ 
                  padding: '1rem', 
                  borderRight: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#5aa8ff',
                    borderRadius: '50%'
                  }}></div>
                  <div>
                    <h4 style={{ 
                      color: '#5aa8ff', 
                      fontSize: '0.9rem', 
                      fontWeight: '600',
                      margin: '0 0 0.25rem 0'
                    }}>
                      {item.name}
                    </h4>
                    <p style={{ 
                      color: '#9fb2d8', 
                      fontSize: '0.8rem',
                      margin: 0
                    }}>
                      {item.owner}
                    </p>
                  </div>
                </div>
                <div style={{ 
                  padding: '1rem', 
                  position: 'relative', 
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: '10%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '60%',
                    height: '20px',
                    background: 'linear-gradient(135deg, #5aa8ff, #3de0ff)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    ...(hoveredItem === `project-${item.id}` ? {
                      transform: 'translateY(-50%) scale(1.05)',
                      boxShadow: '0 4px 15px rgba(90, 168, 255, 0.4)'
                    } : {})
                  }}
                  onMouseEnter={() => setHoveredItem(`project-${item.id}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                  >
                    进行中 ({item.progress}%)
                  </div>
                </div>
              </div>

              {/* 任务行 */}
              {item.tasks.map((task, taskIndex) => {
                const position = getTimelinePosition(task.startDate, task.endDate)
                return (
                  <div 
                    key={task.id}
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '200px 1fr',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      background: '#0c142a',
                      transition: 'all 0.3s ease',
                      ...createAnimationStyle(animations.fadeIn, isVisible),
                      transitionDelay: `${400 + itemIndex * 100 + taskIndex * 50}ms`
                    }}
                  >
                    <div style={{ 
                      padding: '0.75rem 1rem 0.75rem 2rem', 
                      borderRight: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: getStatusColor(task.status),
                        borderRadius: '50%'
                      }}></div>
                      <div>
                        <h5 style={{ 
                          color: '#e6f0ff', 
                          fontSize: '0.8rem', 
                          fontWeight: '500',
                          margin: '0 0 0.125rem 0'
                        }}>
                          {task.name}
                        </h5>
                        <p style={{ 
                          color: '#9fb2d8', 
                          fontSize: '0.7rem',
                          margin: 0
                        }}>
                          {task.owner}
                        </p>
                      </div>
                    </div>
                    <div style={{ 
                      padding: '0.75rem 1rem', 
                      position: 'relative', 
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: `${position.left}%`,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: `${position.width}%`,
                        height: '16px',
                        background: `linear-gradient(135deg, ${getStatusColor(task.status)}, ${getStatusColor(task.status)}88)`,
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.6rem',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        ...(hoveredItem === `task-${task.id}` ? {
                          transform: 'translateY(-50%) scale(1.1)',
                          boxShadow: `0 4px 12px ${getStatusColor(task.status)}40`
                        } : {})
                      }}
                      onMouseEnter={() => setHoveredItem(`task-${task.id}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                      >
                        {getStatusLabel(task.status)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}

          {/* 里程碑标记 */}
          <div style={{ 
            position: 'relative',
            height: '40px',
            background: 'rgba(255, 176, 32, 0.1)',
            borderTop: '2px solid #ffb020',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...createAnimationStyle(animations.fadeIn, isVisible),
            transitionDelay: '800ms'
          }}>
            <div style={{
              background: '#ffb020',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '0.7rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🎯 里程碑: 需求确认
            </div>
          </div>
        </div>
      </div>

      {/* 图例 */}
      <div style={{ 
        display: 'flex', 
        gap: '2rem', 
        marginTop: '1rem', 
        padding: '1rem',
        background: '#0f1730',
        borderRadius: '8px',
        ...createAnimationStyle(animations.fadeIn, isVisible),
        transitionDelay: '1000ms'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '16px', height: '16px', background: '#10b981', borderRadius: '3px' }}></div>
          <span style={{ color: '#9fb2d8', fontSize: '0.8rem' }}>已完成</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '3px' }}></div>
          <span style={{ color: '#9fb2d8', fontSize: '0.8rem' }}>进行中</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '16px', height: '16px', background: '#f59e0b', borderRadius: '3px' }}></div>
          <span style={{ color: '#9fb2d8', fontSize: '0.8rem' }}>待开始</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px' }}></div>
          <span style={{ color: '#9fb2d8', fontSize: '0.8rem' }}>延期</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '0', height: '0', borderLeft: '8px solid #3b82f6', borderTop: '4px solid transparent', borderBottom: '4px solid transparent' }}></div>
          <span style={{ color: '#9fb2d8', fontSize: '0.8rem' }}>依赖关系</span>
        </div>
      </div>
    </div>
  )
}

export default AnimatedGanttChart
