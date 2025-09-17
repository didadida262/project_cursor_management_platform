import React from 'react'
import './index.css'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">项目任务管理系统</h1>
        <p className="text-xl text-muted mb-8">欢迎使用项目任务管理系统</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">项目管理</h2>
            <p className="text-muted">创建、管理和跟踪项目进度</p>
          </div>
          
          <div className="bg-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">任务看板</h2>
            <p className="text-muted">拖拽式任务管理，状态流转</p>
          </div>
          
          <div className="bg-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">甘特图</h2>
            <p className="text-muted">时间线视图，任务依赖关系</p>
          </div>
          
          <div className="bg-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">预警中心</h2>
            <p className="text-muted">智能预警，风险监控</p>
          </div>
          
          <div className="bg-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">报表分析</h2>
            <p className="text-muted">数据可视化，趋势分析</p>
          </div>
          
          <div className="bg-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">用户管理</h2>
            <p className="text-muted">权限管理，组织架构</p>
          </div>
        </div>
      </div>
    </div>
  )
}