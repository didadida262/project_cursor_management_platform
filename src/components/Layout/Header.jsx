import React from 'react'
import { useAppStore } from '../../store'
import { Search, Bell, User, Settings } from 'lucide-react'

export const Header = () => {
  const { currentUser, notifications } = useAppStore()

  return (
    <div className="h-16 bg-panel2 border-b border-white/10 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-text">仪表盘</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="搜索..."
            className="w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/50"
          />
        </div>

        {/* 通知 */}
        <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
          <Bell className="w-5 h-5 text-muted" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>

        {/* 用户头像 */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {currentUser?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-text">{currentUser?.name || '用户'}</p>
            <p className="text-xs text-muted">{currentUser?.role || 'member'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
