import React, { useState } from 'react'
import { useAppStore } from '../store'
import { Project } from '../types'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Users,
  Flag,
  Clock,
  X
} from 'lucide-react'
import { formatDate, getStatusColor } from '../utils'

export const ProjectManagement: React.FC = () => {
  const { projects, users, addProject, updateProject, deleteProject } = useAppStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusText = (status: string) => {
    const statusMap = {
      planning: '规划中',
      active: '进行中',
      paused: '已暂停',
      completed: '已完成',
      cancelled: '已取消'
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  const getOwnerName = (ownerId: string) => {
    const owner = users.find(user => user.id === ownerId)
    return owner?.name || '未知'
  }

  return (
    <div className="space-y-6 panel-scroll">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">项目管理</h1>
          <p className="text-muted mt-1">创建、管理和跟踪项目进度</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          新建项目
        </button>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="搜索项目..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/50"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
        >
          <option value="all">全部状态</option>
          <option value="planning">规划中</option>
          <option value="active">进行中</option>
          <option value="paused">已暂停</option>
          <option value="completed">已完成</option>
          <option value="cancelled">已取消</option>
        </select>
      </div>

      {/* 项目列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-panel border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-200">
            {/* 项目头部 */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text mb-1">{project.name}</h3>
                <p className="text-sm text-muted line-clamp-2">{project.description}</p>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded hover:bg-white/10">
                  <Eye className="w-4 h-4 text-muted" />
                </button>
                <button 
                  onClick={() => setEditingProject(project)}
                  className="p-1 rounded hover:bg-white/10"
                >
                  <Edit className="w-4 h-4 text-muted" />
                </button>
                <button className="p-1 rounded hover:bg-white/10">
                  <MoreVertical className="w-4 h-4 text-muted" />
                </button>
              </div>
            </div>

            {/* 项目信息 */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Users className="w-4 h-4" />
                <span>负责人: {getOwnerName(project.ownerId)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(project.planStart)} - {formatDate(project.planEnd)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Flag className="w-4 h-4" />
                <span>里程碑: {project.milestones.length} 个</span>
              </div>
            </div>

            {/* 状态和进度 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
                <span className="text-sm text-muted">
                  {project.memberIds.length} 成员
                </span>
              </div>
              
              {/* 进度条 */}
              <div className="w-full bg-white/5 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-brand to-brand2 h-2 rounded-full transition-all duration-300"
                  style={{ width: '65%' }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted">
                <span>进度: 65%</span>
                <span>剩余: 15 天</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 空状态 */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">暂无项目</h3>
          <p className="text-muted mb-4">开始创建你的第一个项目</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
          >
            创建项目
          </button>
        </div>
      )}

      {/* 创建/编辑项目模态框 */}
      {showCreateModal && (
        <ProjectFormModal
          project={editingProject}
          onClose={() => {
            setShowCreateModal(false)
            setEditingProject(null)
          }}
          onSave={(projectData) => {
            if (editingProject) {
              updateProject(editingProject.id, projectData)
            } else {
              addProject({
                ...projectData,
                id: Date.now().toString(),
                createdAt: new Date(),
                updatedAt: new Date(),
              } as Project)
            }
            setShowCreateModal(false)
            setEditingProject(null)
          }}
        />
      )}
    </div>
  )
}

// 项目表单模态框组件
const ProjectFormModal: React.FC<{
  project?: Project | null
  onClose: () => void
  onSave: (data: ProjectFormData) => void
}> = ({ project, onClose, onSave }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: project?.name || '',
    description: project?.description || '',
    department: project?.department || '',
    ownerId: project?.ownerId || '',
    memberIds: project?.memberIds || [],
    planStart: project?.planStart ? project.planStart.toISOString().split('T')[0] : '',
    planEnd: project?.planEnd ? project.planEnd.toISOString().split('T')[0] : '',
    dependencies: project?.dependencies || [],
    milestones: project?.milestones || [],
    remark: project?.remark || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-panel border border-white/10 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text">
            {project ? '编辑项目' : '创建项目'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10"
          >
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">项目名称</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">部门</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">项目描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">计划开始</label>
              <input
                type="date"
                value={formData.planStart}
                onChange={(e) => setFormData({...formData, planStart: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">计划结束</label>
              <input
                type="date"
                value={formData.planEnd}
                onChange={(e) => setFormData({...formData, planEnd: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
                required
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
              {project ? '更新项目' : '创建项目'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
