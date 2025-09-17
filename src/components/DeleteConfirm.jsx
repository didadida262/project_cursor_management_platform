import React from 'react'

const DeleteConfirm = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  projectName 
}) => {
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
        maxWidth: '400px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'rgba(239, 68, 68, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            ⚠️
          </div>
          <div>
            <h3 style={{ 
              color: '#e6f0ff', 
              fontSize: '1.25rem', 
              fontWeight: '600',
              margin: '0 0 0.25rem 0'
            }}>
              确认删除
            </h3>
            <p style={{ 
              color: '#9fb2d8', 
              fontSize: '0.9rem',
              margin: 0
            }}>
              此操作无法撤销
            </p>
          </div>
        </div>

        <p style={{ 
          color: '#e6f0ff', 
          fontSize: '1rem',
          marginBottom: '2rem',
          lineHeight: '1.5'
        }}>
          确定要删除项目 <strong style={{ color: '#ef4444' }}>"{projectName}"</strong> 吗？
          <br />
          删除后，该项目下的所有任务和数据都将被永久删除。
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem'
        }}>
          <button
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
            onClick={onConfirm}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            确认删除
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirm
