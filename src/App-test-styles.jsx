import React from 'react'
import './index.css'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">样式测试页面</h1>
        
        {/* 测试自定义颜色 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-text mb-2">面板颜色</h2>
            <p className="text-muted">这是 panel 背景色</p>
          </div>
          
          <div className="bg-panel2 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-text mb-2">面板2颜色</h2>
            <p className="text-muted">这是 panel2 背景色</p>
          </div>
          
          <div className="bg-gradient-to-br from-brand to-brand2 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-2">品牌渐变色</h2>
            <p className="text-white/80">这是 brand 到 brand2 的渐变</p>
          </div>
        </div>

        {/* 测试渐变卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold text-text mb-1">12</h3>
            <p className="text-muted">总项目数</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="text-2xl font-bold text-text mb-1">85%</h3>
            <p className="text-muted">完成率</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold text-text mb-1">48</h3>
            <p className="text-muted">活跃任务</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-6">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-2xl font-bold text-text mb-1">3</h3>
            <p className="text-muted">预警数量</p>
          </div>
        </div>

        {/* 测试按钮样式 */}
        <div className="flex gap-4 mb-8">
          <button className="px-6 py-3 bg-gradient-to-r from-brand to-brand2 text-white rounded-xl hover:from-brand/90 hover:to-brand2/90 transition-all duration-200 shadow-lg shadow-brand/25">
            主要按钮
          </button>
          <button className="px-6 py-3 bg-white/5 border border-white/10 text-text rounded-xl hover:bg-white/10 transition-colors">
            次要按钮
          </button>
          <button className="px-6 py-3 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition-colors">
            成功按钮
          </button>
        </div>

        {/* 测试文本样式 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-text">文本样式测试</h2>
          <p className="text-lg text-text">这是主要文本颜色</p>
          <p className="text-muted">这是次要文本颜色</p>
          <p className="text-brand">这是品牌色文本</p>
          <p className="text-green-400">这是成功色文本</p>
          <p className="text-orange-400">这是警告色文本</p>
          <p className="text-red-400">这是错误色文本</p>
        </div>
      </div>
    </div>
  )
}
