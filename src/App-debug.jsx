import React from 'react'
import './index.css'

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="flex">
        {/* 左侧导航栏 */}
        <div className="w-64 bg-panel border-r border-white/10">
          <div className="p-6">
            <h1 className="text-xl font-bold text-text mb-6">项目管理系统</h1>
            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-text hover:bg-white/10 rounded-lg">
                📊 仪表盘
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-text hover:bg-white/10 rounded-lg">
                📁 项目管理
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-text hover:bg-white/10 rounded-lg">
                📋 任务看板
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-text hover:bg-white/10 rounded-lg">
                📈 甘特图
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-text hover:bg-white/10 rounded-lg">
                ⚠️ 预警中心
              </a>
            </nav>
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col">
          {/* 顶部导航栏 */}
          <div className="h-16 bg-panel2 border-b border-white/10 flex items-center justify-between px-6">
            <h2 className="text-lg font-semibold text-text">仪表盘</h2>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            </div>
          </div>

          {/* 主内容 */}
          <main className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-panel border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-text mb-2">项目总数</h3>
                <p className="text-3xl font-bold text-brand">12</p>
                <p className="text-sm text-muted mt-1">+2 本月新增</p>
              </div>
              
              <div className="bg-panel border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-text mb-2">任务总数</h3>
                <p className="text-3xl font-bold text-brand">48</p>
                <p className="text-sm text-muted mt-1">+8 本周新增</p>
              </div>
              
              <div className="bg-panel border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-text mb-2">完成率</h3>
                <p className="text-3xl font-bold text-brand">85%</p>
                <p className="text-sm text-muted mt-1">+5% 较上月</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
