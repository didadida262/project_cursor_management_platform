// 用户角色
export type UserRole = 'admin' | 'owner' | 'member' | 'observer'

// 项目状态
export type ProjectStatus = 'planning' | 'active' | 'paused' | 'completed' | 'cancelled'

// 任务状态
export type TaskStatus = 'todo' | 'doing' | 'blocked' | 'completed'

// 任务优先级
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

// 预警级别
export type AlertLevel = 'low' | 'medium' | 'high' | 'critical'

// 用户
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  department: string
  createdAt: Date
  updatedAt: Date
}

// 组织部门
export interface Department {
  id: string
  name: string
  parentId?: string
  members: string[]
  createdAt: Date
}

// 项目
export interface Project {
  id: string
  name: string
  description?: string
  department: string
  status: ProjectStatus
  ownerId: string
  memberIds: string[]
  planStart: Date
  planEnd: Date
  actualStart?: Date
  actualEnd?: Date
  dependencies: string[]
  milestones: Milestone[]
  remark?: string
  progressPlan?: string
  createdAt: Date
  updatedAt: Date
}

// 里程碑
export interface Milestone {
  id: string
  name: string
  description?: string
  dueDate: Date
  completed: boolean
  completedAt?: Date
  createdAt: Date
}

// 任务
export interface Task {
  id: string
  projectId: string
  parentTaskId?: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId: string
  collaboratorIds: string[]
  estimate: number // 预计工时（小时）
  planStart: Date
  planEnd: Date
  actualStart?: Date
  actualEnd?: Date
  spentHours: number
  dependencies: string[]
  progress: number // 0-100
  labels: string[]
  attachments: Attachment[]
  notes: string
  createdAt: Date
  updatedAt: Date
}

// 附件
export interface Attachment {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadedBy: string
  uploadedAt: Date
}

// 预警
export interface Alert {
  id: string
  resourceType: 'project' | 'task'
  resourceId: string
  type: string
  level: AlertLevel
  reason: string
  predictedDelayDays?: number
  createdAt: Date
  notifiedTo: string[]
  status: 'active' | 'resolved' | 'dismissed'
}

// 评论
export interface Comment {
  id: string
  resourceType: 'project' | 'task'
  resourceId: string
  authorId: string
  content: string
  mentions: string[]
  createdAt: Date
  updatedAt: Date
}

// 通知
export interface Notification {
  id: string
  userId: string
  title: string
  content: string
  type: 'alert' | 'comment' | 'assignment' | 'deadline'
  read: boolean
  createdAt: Date
}

// 仪表盘数据
export interface DashboardData {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  onTimeRate: number
  delayRate: number
  activeTasks: number
  completedTasks: number
  blockedTasks: number
  recentAlerts: Alert[]
  projectProgress: ProjectProgress[]
  weeklyTrend: WeeklyTrend[]
}

// 项目进度
export interface ProjectProgress {
  projectId: string
  projectName: string
  progress: number
  status: ProjectStatus
  owner: string
  department: string
}

// 周趋势数据
export interface WeeklyTrend {
  date: string
  completed: number
  delayed: number
  onTime: number
}

// 表单数据
export interface ProjectFormData {
  name: string
  description?: string
  department: string
  ownerId: string
  memberIds: string[]
  planStart: string
  planEnd: string
  dependencies: string[]
  milestones: Omit<Milestone, 'id' | 'createdAt'>[]
  remark?: string
}

export interface TaskFormData {
  title: string
  description?: string
  projectId: string
  parentTaskId?: string
  priority: TaskPriority
  assigneeId: string
  collaboratorIds: string[]
  estimate: number
  planStart: string
  planEnd: string
  dependencies: string[]
  labels: string[]
  notes?: string
}
