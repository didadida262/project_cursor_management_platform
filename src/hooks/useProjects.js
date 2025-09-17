import { useState, useMemo } from 'react'

// 模拟项目数据
const initialProjects = [
  {
    id: 1,
    name: 'CRM系统重构',
    department: '技术部',
    owner: '张三',
    status: 'active',
    progress: 65,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    members: 5,
    tasks: 12,
    alerts: 2,
    description: '重构现有CRM系统，提升用户体验和系统性能',
    priority: 'high'
  },
  {
    id: 2,
    name: '移动端App开发',
    department: '产品部',
    owner: '李四',
    status: 'active',
    progress: 30,
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    members: 8,
    tasks: 25,
    alerts: 1,
    description: '开发iOS和Android移动应用，支持跨平台功能',
    priority: 'medium'
  },
  {
    id: 3,
    name: '数据分析平台',
    department: '技术部',
    owner: '王五',
    status: 'completed',
    progress: 100,
    startDate: '2023-11-01',
    endDate: '2024-01-10',
    members: 6,
    tasks: 18,
    alerts: 0,
    description: '构建企业级数据分析平台，支持实时数据处理',
    priority: 'high'
  },
  {
    id: 4,
    name: '用户界面优化',
    department: '产品部',
    owner: '赵六',
    status: 'paused',
    progress: 45,
    startDate: '2024-01-20',
    endDate: '2024-02-20',
    members: 3,
    tasks: 8,
    alerts: 0,
    description: '优化现有用户界面，提升用户体验',
    priority: 'low'
  },
  {
    id: 5,
    name: 'API接口开发',
    department: '技术部',
    owner: '孙七',
    status: 'cancelled',
    progress: 20,
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    members: 4,
    tasks: 15,
    alerts: 3,
    description: '开发RESTful API接口，支持第三方集成',
    priority: 'high'
  }
]

export const useProjects = () => {
  const [projects, setProjects] = useState(initialProjects)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  // 筛选和搜索逻辑
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter
      const matchesDepartment = departmentFilter === 'all' || project.department === departmentFilter
      
      return matchesSearch && matchesStatus && matchesDepartment
    })
  }, [projects, searchTerm, statusFilter, departmentFilter])

  // 统计数据
  const stats = useMemo(() => {
    const total = projects.length
    const active = projects.filter(p => p.status === 'active').length
    const completed = projects.filter(p => p.status === 'completed').length
    const delayed = projects.filter(p => p.status === 'delayed').length
    
    return { total, active, completed, delayed }
  }, [projects])

  // 创建项目
  const createProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      ...projectData,
      members: 1,
      tasks: 0,
      alerts: 0,
      progress: 0
    }
    setProjects(prev => [...prev, newProject])
    setShowCreateModal(false)
  }

  // 更新项目
  const updateProject = (id, projectData) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...projectData } : project
    ))
    setEditingProject(null)
  }

  // 删除项目
  const deleteProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id))
    setShowDeleteConfirm(null)
  }

  // 获取状态颜色
  const getStatusColor = (status) => {
    const colors = {
      active: '#5aa8ff',
      completed: '#10b981',
      paused: '#f59e0b',
      cancelled: '#ef4444',
      delayed: '#ef4444'
    }
    return colors[status] || '#9ca3af'
  }

  // 获取状态标签
  const getStatusLabel = (status) => {
    const labels = {
      active: '进行中',
      completed: '已完成',
      paused: '已暂停',
      cancelled: '已取消',
      delayed: '延期'
    }
    return labels[status] || status
  }

  return {
    projects: filteredProjects,
    allProjects: projects,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    departmentFilter,
    setDepartmentFilter,
    showCreateModal,
    setShowCreateModal,
    editingProject,
    setEditingProject,
    showDeleteConfirm,
    setShowDeleteConfirm,
    stats,
    createProject,
    updateProject,
    deleteProject,
    getStatusColor,
    getStatusLabel
  }
}
