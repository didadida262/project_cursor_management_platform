import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Project, Task, User, Alert, Comment, Notification, DashboardData } from '../types'

interface AppState {
  // 用户状态
  currentUser: User | null
  users: User[]
  
  // 项目状态
  projects: Project[]
  selectedProject: Project | null
  
  // 任务状态
  tasks: Task[]
  selectedTask: Task | null
  
  // 预警和通知
  alerts: Alert[]
  notifications: Notification[]
  unreadNotifications: number
  
  // UI状态
  sidebarCollapsed: boolean
  currentPage: string
  
  // 仪表盘数据
  dashboardData: DashboardData | null
}

interface AppActions {
  // 用户操作
  setCurrentUser: (user: User) => void
  addUser: (user: User) => void
  updateUser: (id: string, updates: Partial<User>) => void
  deleteUser: (id: string) => void
  
  // 项目操作
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  setSelectedProject: (project: Project | null) => void
  
  // 任务操作
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  setSelectedTask: (task: Task | null) => void
  moveTask: (taskId: string, newStatus: string) => void
  
  // 预警和通知操作
  addAlert: (alert: Alert) => void
  updateAlert: (id: string, updates: Partial<Alert>) => void
  deleteAlert: (id: string) => void
  addNotification: (notification: Notification) => void
  markNotificationAsRead: (id: string) => void
  markAllNotificationsAsRead: () => void
  
  // UI操作
  toggleSidebar: () => void
  setCurrentPage: (page: string) => void
  
  // 数据操作
  setDashboardData: (data: DashboardData) => void
  refreshDashboardData: () => void
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      // 初始状态
      currentUser: null,
      users: [],
      projects: [],
      selectedProject: null,
      tasks: [],
      selectedTask: null,
      alerts: [],
      notifications: [],
      unreadNotifications: 0,
      sidebarCollapsed: false,
      currentPage: 'dashboard',
      dashboardData: null,

      // 用户操作
      setCurrentUser: (user) => set({ currentUser: user }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (id, updates) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...updates } : user
          ),
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),

      // 项目操作
      addProject: (project) =>
        set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updates } : project
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        })),
      setSelectedProject: (project) => set({ selectedProject: project }),

      // 任务操作
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      setSelectedTask: (task) => set({ selectedTask: task }),
      moveTask: (taskId, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus as any } : task
          ),
        })),

      // 预警和通知操作
      addAlert: (alert) => set((state) => ({ alerts: [...state.alerts, alert] })),
      updateAlert: (id, updates) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id ? { ...alert, ...updates } : alert
          ),
        })),
      deleteAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== id),
        })),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [...state.notifications, notification],
          unreadNotifications: state.unreadNotifications + 1,
        })),
      markNotificationAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification
          ),
          unreadNotifications: Math.max(0, state.unreadNotifications - 1),
        })),
      markAllNotificationsAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            read: true,
          })),
          unreadNotifications: 0,
        })),

      // UI操作
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setCurrentPage: (page) => set({ currentPage: page }),

      // 数据操作
      setDashboardData: (data) => set({ dashboardData: data }),
      refreshDashboardData: () => {
        // 这里可以调用API刷新数据
        console.log('Refreshing dashboard data...')
      },
    }),
    {
      name: 'pm-app-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
)
