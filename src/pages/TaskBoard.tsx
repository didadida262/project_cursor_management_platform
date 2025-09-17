import React, { useState } from 'react'
import { useAppStore } from '../store'
import { Task, TaskStatus } from '../types'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Clock,
  User,
  Flag,
  MessageSquare,
  Paperclip,
  Calendar,
  X
} from 'lucide-react'
import { formatDate, getPriorityColor, getStatusColor } from '../utils'

const columns: { key: TaskStatus; name: string; color: string }[] = [
  { key: 'todo', name: '待办', color: 'text-gray-500' },
  { key: 'doing', name: '进行中', color: 'text-blue-500' },
  { key: 'blocked', name: '阻塞', color: 'text-red-500' },
  { key: 'completed', name: '已完成', color: 'text-green-500' },
]

export const TaskBoard: React.FC = () => {
  const { tasks, users, moveTask, addTask, updateTask, deleteTask } = useAppStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProject = selectedProject === 'all' || task.projectId === selectedProject
    return matchesSearch && matchesProject
  })

  const getTasksByStatus = (status: TaskStatus) => {
    return filteredTasks.filter(task => task.status === status)
  }

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, newStatus: TaskStatus) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('taskId')
    moveTask(taskId, newStatus)
  }

  const getAssigneeName = (assigneeId: string) => {
    const user = users.find(user => user.id === assigneeId)
    return user?.name || '未分配'
  }

  const getPriorityText = (priority: string) => {
    const priorityMap = {
      low: '低',
      medium: '中',
      high: '高',
      urgent: '紧急'
    }
    return priorityMap[priority as keyof typeof priorityMap] || priority
  }

  return (
    <div className="space-y-6 panel-scroll">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">任务看板</h1>
          <p className="text-muted mt-1">拖拽任务卡片来更新状态</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          新建任务
        </button>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="搜索任务..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/50"
          />
        </div>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
        >
          <option value="all">全部项目</option>
          <option value="1">CRM系统重构</option>
          <option value="2">移动端App开发</option>
        </select>
      </div>

      {/* 看板列 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div
            key={column.key}
            className="bg-panel2 border border-white/10 rounded-xl p-4 min-h-[600px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.key)}
          >
            {/* 列头部 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${column.color.replace('text-', 'bg-')}`} />
                <h3 className="font-semibold text-text">{column.name}</h3>
                <span className="text-sm text-muted">({getTasksByStatus(column.key).length})</span>
              </div>
              <button className="p-1 rounded hover:bg-white/10">
                <MoreVertical className="w-4 h-4 text-muted" />
              </button>
            </div>

            {/* 任务卡片 */}
            <div className="space-y-3">
              {getTasksByStatus(column.key).map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="bg-panel border border-white/10 rounded-lg p-4 hover:border-white/20 cursor-move transition-all duration-200"
                >
                  {/* 任务头部 */}
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-text text-sm line-clamp-2">{task.title}</h4>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => setEditingTask(task)}
                        className="p-1 rounded hover:bg-white/10"
                      >
                        <Edit className="w-3 h-3 text-muted" />
                      </button>
                      <button className="p-1 rounded hover:bg-white/10">
                        <MoreVertical className="w-3 h-3 text-muted" />
                      </button>
                    </div>
                  </div>

                  {/* 任务描述 */}
                  {task.description && (
                    <p className="text-xs text-muted mb-3 line-clamp-2">{task.description}</p>
                  )}

                  {/* 任务标签 */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                      {getPriorityText(task.priority)}
                    </span>
                    {task.labels.map((label, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-white/10 rounded-full text-muted">
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* 进度条 */}
                  <div className="w-full bg-white/5 rounded-full h-1.5 mb-3">
                    <div 
                      className="bg-gradient-to-r from-brand to-brand2 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>

                  {/* 任务信息 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <User className="w-3 h-3" />
                      <span>{getAssigneeName(task.assigneeId)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(task.planEnd)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <Clock className="w-3 h-3" />
                      <span>{task.estimate}h</span>
                    </div>
                  </div>

                  {/* 任务操作 */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <button className="p-1 rounded hover:bg-white/10">
                        <MessageSquare className="w-3 h-3 text-muted" />
                      </button>
                      <button className="p-1 rounded hover:bg-white/10">
                        <Paperclip className="w-3 h-3 text-muted" />
                      </button>
                    </div>
                    <span className="text-xs text-muted">{task.progress}%</span>
                  </div>
                </div>
              ))}

              {/* 添加任务按钮 */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full p-4 border-2 border-dashed border-white/20 rounded-lg text-muted hover:border-brand/50 hover:text-brand transition-colors"
              >
                <Plus className="w-4 h-4 mx-auto mb-2" />
                <span className="text-sm">添加任务</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 创建/编辑任务模态框 */}
      {showCreateModal && (
        <TaskFormModal
          task={editingTask}
          onClose={() => {
            setShowCreateModal(false)
            setEditingTask(null)
          }}
          onSave={(taskData) => {
            if (editingTask) {
              updateTask(editingTask.id, taskData)
            } else {
              addTask({
                ...taskData,
                id: Date.now().toString(),
                createdAt: new Date(),
                updatedAt: new Date(),
              } as Task)
            }
            setShowCreateModal(false)
            setEditingTask(null)
          }}
        />
      )}
    </div>
  )
}

// 任务表单模态框组件
const TaskFormModal: React.FC<{
  task?: Task | null
  onClose: () => void
  onSave: (data: any) => void
}> = ({ task, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    projectId: task?.projectId || '1',
    priority: task?.priority || 'medium',
    assigneeId: task?.assigneeId || '',
    estimate: task?.estimate || 8,
    planStart: task?.planStart ? task.planStart.toISOString().split('T')[0] : '',
    planEnd: task?.planEnd ? task.planEnd.toISOString().split('T')[0] : '',
    labels: task?.labels || [],
    notes: task?.notes || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-panel border border-white/10 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto table-scroll">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text">
            {task ? '编辑任务' : '创建任务'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10"
          >
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">任务标题</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">任务描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">优先级</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
              >
                <option value="low">低</option>
                <option value="medium">中</option>
                <option value="high">高</option>
                <option value="urgent">紧急</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">预计工时</label>
              <input
                type="number"
                value={formData.estimate}
                onChange={(e) => setFormData({...formData, estimate: Number(e.target.value)})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
                min="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">计划开始</label>
              <input
                type="date"
                value={formData.planStart}
                onChange={(e) => setFormData({...formData, planStart: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">计划结束</label>
              <input
                type="date"
                value={formData.planEnd}
                onChange={(e) => setFormData({...formData, planEnd: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-muted hover:text-text transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
            >
              {task ? '更新任务' : '创建任务'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
