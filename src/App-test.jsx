import React from 'react'
import './index.css'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="flex">
        {/* 侧边栏 */}
        <aside className="w-64 bg-panel border-r border-white/10 p-4">
          <h2 className="text-lg font-bold mb-4">项目中心</h2>
          <nav className="space-y-2">
            <button className="w-full text-left px-3 py-2 rounded-lg bg-brand/20 text-brand">
              仪表盘
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg text-muted hover:bg-white/10">
              项目管理
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg text-muted hover:bg-white/10">
              任务看板
            </button>
          </nav>
        </aside>

        {/* 主内容区 */}
        <div className="flex-1 flex flex-col">
          {/* 顶部栏 */}
          <header className="bg-panel border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">仪表盘</h1>
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg hover:bg-white/10">🔔</button>
                <button className="p-2 rounded-lg hover:bg-white/10">⚙️</button>
              </div>
            </div>
          </header>

          {/* 内容区 */}
          <main className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-panel border border-white/10 rounded-xl p-6">
                <h3 className="text-muted text-sm mb-1">总项目数</h3>
                <p className="text-3xl font-bold text-text">12</p>
              </div>
              <div className="bg-panel border border-white/10 rounded-xl p-6">
                <h3 className="text-muted text-sm mb-1">按期率</h3>
                <p className="text-3xl font-bold text-green-500">86%</p>
              </div>
              <div className="bg-panel border border-white/10 rounded-xl p-6">
                <h3 className="text-muted text-sm mb-1">延期率</h3>
                <p className="text-3xl font-bold text-red-500">12%</p>
              </div>
              <div className="bg-panel border border-white/10 rounded-xl p-6">
                <h3 className="text-muted text-sm mb-1">活跃任务</h3>
                <p className="text-3xl font-bold text-text">128</p>
              </div>
            </div>

            <div className="bg-panel border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">项目进度</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">CRM系统重构</h4>
                    <span className="text-sm text-muted">65%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div className="bg-gradient-to-r from-brand to-brand2 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">移动端App开发</h4>
                    <span className="text-sm text-muted">35%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div className="bg-gradient-to-r from-brand to-brand2 h-2 rounded-full" style={{width: '35%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
