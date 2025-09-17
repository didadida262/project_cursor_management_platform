import React, { useState } from 'react'
import { useAppStore } from '../store'
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
  X,
  TrendingUp,
  Activity,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

export const ProjectManagement = () => {
  const { projects, users, addProject, updateProject, deleteProject } = useAppStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusText = (status) => {
    const statusMap = {
      planning: '规划中',
      active: '进行中',
      paused: '已暂停',
      completed: '已完成',
      cancelled: '已取消'
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status) => {
    const colors = {
      planning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      paused: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      completed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return colors[status] || colors.planning
  }

  const getOwnerName = (ownerId) => {
    const owner = users.find(user => user.id === ownerId)
    return owner?.name || '未知'
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-500 to-green-600'
    if (progress >= 60) return 'from-blue-500 to-blue-600'
    if (progress >= 40) return 'from-yellow-500 to-yellow-600'
    return 'from-red-500 to-red-600'
  }

  return (
    <div className="p-6 space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">项目管理</h1>
          <p className="text-muted">创建、管理和跟踪项目进度</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand to-brand2 text-white rounded-xl hover:from-brand/90 hover:to-brand2/90 transition-all duration-200 shadow-lg shadow-brand/25"
        >
          <Plus className="w-5 h-5" />
          新建项目
        </button>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="搜索项目名称或描述..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-transparent transition-all"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-transparent transition-all"
        >
          <option value="all">全部状态</option>
          <option value="planning">规划中</option>
          <option value="active">进行中</option>
          <option value="paused">已暂停</option>
          <option value="completed">已完成</option>
          <option value="cancelled">已取消</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
          <Filter className="w-5 h-5" />
          筛选
        </button>
      </div>

      {/* 项目统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">{filteredProjects.length}</p>
              <p className="text-sm text-muted">总项目数</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">{filteredProjects.filter(p => p.status === 'active').length}</p>
              <p className="text-sm text-muted">进行中</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">{filteredProjects.filter(p => p.status === 'completed').length}</p>
              <p className="text-sm text-muted">已完成</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text">{filteredProjects.filter(p => p.status === 'paused').length}</p>
              <p className="text-sm text-muted">已暂停</p>
            </div>
          </div>
        </div>
      </div>

      {/* 项目列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="group bg-panel border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:shadow-xl hover:shadow-black/20 transition-all duration-300">
            {/* 项目头部 */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-text mb-2 group-hover:text-brand transition-colors">{project.name}</h3>
                <p className="text-sm text-muted line-clamp-2">{project.description}</p>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Eye className="w-4 h-4 text-muted" />
                </button>
                <button 
                  onClick={() => setEditingProject(project)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Edit className="w-4 h-4 text-muted" />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
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
                <span>{new Date(project.planStart).toLocaleDateString()} - {new Date(project.planEnd).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Flag className="w-4 h-4" />
                <span>里程碑: {project.milestones.length} 个</span>
              </div>
            </div>

            {/* 状态和进度 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium px-3 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
                <span className="text-sm text-muted">
                  {project.memberIds.length} 成员
                </span>
              </div>
              
              {/* 进度条 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">项目进度</span>
                  <span className="font-medium text-text">65%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`bg-gradient-to-r ${getProgressColor(65)} h-3 rounded-full transition-all duration-500`}
                    style={{ width: '65%' }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>剩余: 15 天</span>
                  <span>预计完成: 2024-02-15</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 空状态 */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-10 h-10 text-muted" />
          </div>
          <h3 className="text-2xl font-semibold text-text mb-3">暂无项目</h3>
          <p className="text-muted mb-8 max-w-md mx-auto">开始创建你的第一个项目，让团队协作更加高效</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-brand to-brand2 text-white rounded-xl hover:from-brand/90 hover:to-brand2/90 transition-all duration-200 shadow-lg shadow-brand/25"
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
              })
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
const ProjectFormModal = ({ project, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    department: project?.department || '',
    ownerId: project?.ownerId || '',
    memberIds: project?.memberIds || [],
    planStart: project?.planStart ? new Date(project.planStart).toISOString().split('T')[0] : '',
    planEnd: project?.planEnd ? new Date(project.planEnd).toISOString().split('T')[0] : '',
    dependencies: project?.dependencies || [],
    milestones: project?.milestones || [],
    remark: project?.remark || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-panel border border-white/10 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-text">
            {project ? '编辑项目' : '创建项目'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6 text-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text mb-3">项目名称</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-transparent transition-all"
                placeholder="输入项目名称"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-3">部门</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-transparent transition-all"
                placeholder="输入部门名称"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-3">项目描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-transparent transition-all resize-none"
              placeholder="描述项目目标和范围"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text mb-3">计划开始</label>
              <input
                type="date"
                value={formData.planStart}
                onChange={(e) => setFormData({...formData, planStart: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-3">计划结束</label>
              <input
                type="date"
                value={formData.planEnd}
                onChange={(e) => setFormData({...formData, planEnd: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-muted hover:text-text transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-brand to-brand2 text-white rounded-xl hover:from-brand/90 hover:to-brand2/90 transition-all duration-200 shadow-lg shadow-brand/25"
            >
              {project ? '更新项目' : '创建项目'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
