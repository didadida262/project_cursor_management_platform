import { Project, Task, User, Alert } from '../types'

// 格式化日期
export const formatDate = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

// 格式化日期时间
export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 计算项目进度
export const calculateProjectProgress = (project: Project, tasks: Task[]): number => {
  const projectTasks = tasks.filter(task => task.projectId === project.id)
  if (projectTasks.length === 0) return 0
  
  const totalProgress = projectTasks.reduce((sum, task) => sum + task.progress, 0)
  return Math.round(totalProgress / projectTasks.length)
}

// 计算任务完成率
export const calculateTaskCompletionRate = (tasks: Task[]): number => {
  if (tasks.length === 0) return 0
  const completedTasks = tasks.filter(task => task.status === 'completed').length
  return Math.round((completedTasks / tasks.length) * 100)
}

// 计算按期率
export const calculateOnTimeRate = (tasks: Task[]): number => {
  if (tasks.length === 0) return 0
  const onTimeTasks = tasks.filter(task => {
    if (task.status !== 'completed' || !task.actualEnd) return false
    return new Date(task.actualEnd) <= new Date(task.planEnd)
  }).length
  return Math.round((onTimeTasks / tasks.length) * 100)
}

// 获取状态颜色
export const getStatusColor = (status: string): string => {
  const colors = {
    planning: 'text-blue-500',
    active: 'text-green-500',
    paused: 'text-yellow-500',
    cancelled: 'text-red-500',
    todo: 'text-gray-500',
    doing: 'text-blue-500',
    blocked: 'text-red-500',
    completed: 'text-green-500',
  }
  return colors[status as keyof typeof colors] || 'text-gray-500'
}

// 获取优先级颜色
export const getPriorityColor = (priority: string): string => {
  const colors = {
    low: 'text-gray-500',
    medium: 'text-yellow-500',
    high: 'text-orange-500',
    urgent: 'text-red-500',
  }
  return colors[priority as keyof typeof colors] || 'text-gray-500'
}

// 获取预警级别颜色
export const getAlertLevelColor = (level: string): string => {
  const colors = {
    low: 'text-gray-500',
    medium: 'text-yellow-500',
    high: 'text-orange-500',
    critical: 'text-red-500',
  }
  return colors[level as keyof typeof colors] || 'text-gray-500'
}

// 生成唯一ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

// 计算剩余天数
export const getDaysRemaining = (endDate: Date | string): number => {
  const end = new Date(endDate)
  const now = new Date()
  const diffTime = end.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// 检查是否延期
export const isOverdue = (endDate: Date | string): boolean => {
  return getDaysRemaining(endDate) < 0
}

// 格式化文件大小
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 搜索过滤
export const filterBySearch = <T>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] => {
  if (!searchTerm) return items
  
  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field]
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchTerm.toLowerCase())
      }
      return false
    })
  )
}

// 排序
export const sortBy = <T>(
  items: T[],
  field: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...items].sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1
    if (aValue > bValue) return direction === 'asc' ? 1 : -1
    return 0
  })
}

// 防抖
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// 节流
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
