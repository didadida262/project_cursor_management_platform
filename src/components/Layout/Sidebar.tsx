import React from 'react'
import { useAppStore } from '../../store'
import {
  LayoutDashboard,
  FolderKanban,
  KanbanSquare,
  Calendar,
  AlarmClock,
  Users,
  BarChart3,
  Menu,
  X,
} from 'lucide-react'

const menuItems = [
  { id: 'dashboard', label: '仪表盘', icon: LayoutDashboard },
  { id: 'projects', label: '项目管理', icon: FolderKanban },
  { id: 'tasks', label: '任务看板', icon: KanbanSquare },
  { id: 'gantt', label: '甘特图', icon: Calendar },
  { id: 'alerts', label: '预警中心', icon: AlarmClock },
  { id: 'users', label: '用户管理', icon: Users },
]

export const Sidebar: React.FC = () => {
  const { 
    sidebarCollapsed, 
    toggleSidebar, 
    currentPage, 
    setCurrentPage,
    unreadNotifications 
  } = useAppStore()

  return (
    <aside className={`bg-panel border-r border-white/10 transition-all duration-300 sidebar-scroll ${
      sidebarCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* 头部 */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-brand to-brand2 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">项目中心</span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 导航菜单 */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          const hasNotification = item.id === 'alerts' && unreadNotifications > 0

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-brand/20 text-brand border border-brand/30'
                  : 'text-muted hover:bg-white/10 hover:text-text'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {hasNotification && (
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </>
              )}
            </button>
          )
        })}
      </nav>

      {/* 底部用户信息 */}
      {!sidebarCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-brand to-brand2 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">张</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text">张三</div>
                <div className="text-xs text-muted">管理员</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
