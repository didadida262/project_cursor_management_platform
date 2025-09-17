import React from 'react'
import { useAppStore } from '../../store'
import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react'

export const Header: React.FC = () => {
  const { 
    unreadNotifications, 
    markAllNotificationsAsRead,
    currentUser 
  } = useAppStore()

  return (
    <header className="bg-panel border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* 左侧搜索 */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="搜索项目、任务..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50"
            />
          </div>
        </div>

        {/* 右侧操作 */}
        <div className="flex items-center gap-3">
          {/* 主题切换 */}
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Moon className="w-5 h-5 text-muted" />
          </button>

          {/* 通知 */}
          <div className="relative">
            <button 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors relative"
              onClick={markAllNotificationsAsRead}
            >
              <Bell className="w-5 h-5 text-muted" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </button>
          </div>

          {/* 设置 */}
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5 text-muted" />
          </button>

          {/* 用户菜单 */}
          <div className="flex items-center gap-3 pl-3 border-l border-white/10">
            <div className="w-8 h-8 bg-gradient-to-r from-brand to-brand2 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {currentUser?.name?.[0] || 'U'}
              </span>
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-text">
                {currentUser?.name || '用户'}
              </div>
              <div className="text-xs text-muted">
                {currentUser?.role === 'admin' ? '管理员' : '成员'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
