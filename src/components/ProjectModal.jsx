import React, { useState, useEffect } from 'react'

const ProjectModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  project = null, 
  isEdit = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    owner: '',
    status: 'active',
    priority: 'medium',
    startDate: '',
    endDate: '',
    description: ''
  })

  useEffect(() => {
    if (isEdit && project) {
      setFormData({
        name: project.name || '',
        department: project.department || '',
        owner: project.owner || '',
        status: project.status || 'active',
        priority: project.priority || 'medium',
        startDate: project.startDate || '',
        endDate: project.endDate || '',
        description: project.description || ''
      })
    } else {
      setFormData({
        name: '',
        department: '',
        owner: '',
        status: 'active',
        priority: 'medium',
        startDate: '',
        endDate: '',
        description: ''
      })
    }
  }, [isEdit, project, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#0f1730',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '2rem',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            color: '#e6f0ff', 
            fontSize: '1.5rem', 
            fontWeight: '600',
            margin: 0 
          }}>
            {isEdit ? '编辑项目' : '新建项目'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#9fb2d8',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                color: '#e6f0ff', 
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                项目名称 *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#0c142a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: '#e6f0ff',
                  fontSize: '0.9rem'
                }}
                placeholder="请输入项目名称"
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                color: '#e6f0ff', 
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                部门 *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#0c142a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: '#e6f0ff',
                  fontSize: '0.9rem'
                }}
              >
                <option value="">选择部门</option>
                <option value="技术部">技术部</option>
                <option value="产品部">产品部</option>
                <option value="运营部">运营部</option>
                <option value="设计部">设计部</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                color: '#e6f0ff', 
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                负责人 *
              </label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#0c142a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: '#e6f0ff',
                  fontSize: '0.9rem'
                }}
                placeholder="请输入负责人姓名"
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                color: '#e6f0ff', 
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                优先级
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#0c142a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: '#e6f0ff',
                  fontSize: '0.9rem'
                }}
              >
                <option value="low">低</option>
                <option value="medium">中</option>
                <option value="high">高</option>
                <option value="urgent">紧急</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                color: '#e6f0ff', 
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                开始日期
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#0c142a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: '#e6f0ff',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                color: '#e6f0ff', 
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                结束日期
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#0c142a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: '#e6f0ff',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              color: '#e6f0ff', 
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              项目描述
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#0c142a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                color: '#e6f0ff',
                fontSize: '0.9rem',
                resize: 'vertical'
              }}
              placeholder="请输入项目描述"
            />
          </div>

          {isEdit && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                color: '#e6f0ff', 
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                项目状态
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#0c142a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: '#e6f0ff',
                  fontSize: '0.9rem'
                }}
              >
                <option value="active">进行中</option>
                <option value="completed">已完成</option>
                <option value="paused">已暂停</option>
                <option value="cancelled">已取消</option>
                <option value="delayed">延期</option>
              </select>
            </div>
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(255,255,255,0.1)',
                color: '#9fb2d8',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              取消
            </button>
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #5aa8ff, #3de0ff)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              {isEdit ? '更新项目' : '创建项目'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectModal
