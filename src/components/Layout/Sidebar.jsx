import React from 'react'
import { useAppStore } from '../../store'
import {
  LayoutDashboard,
  FolderKanban,
  KanbanSquare,
  Calendar,
  AlarmClock,
  Settings,
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
  { id: 'reports', label: '报表分析', icon: BarChart3 },
  { id: 'users', label: '用户管理', icon: Users },
  { id: 'settings', label: '系统设置', icon: Settings },
]

export const Sidebar = () => {
  const { currentPage, setCurrentPage } = useAppStore()
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <div className={`bg-panel border-r border-white/10 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-text">项目管理系统</h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isCollapsed ? <Menu className="w-5 h-5 text-muted" /> : <X className="w-5 h-5 text-muted" />}
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-brand/20 text-brand border border-brand/30'
                    : 'text-muted hover:bg-white/10 hover:text-text'
                }`}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
