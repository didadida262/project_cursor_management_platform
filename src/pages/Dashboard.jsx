import React from 'react'
import { useAppStore } from '../store'
import { 
  TrendingUp, 
  Users, 
  FolderOpen, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  BarChart3,
  Activity,
  Calendar,
  Target
} from 'lucide-react'

export const Dashboard = () => {
  const { projects, tasks, alerts, users } = useAppStore()

  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    overdueTasks: tasks.filter(t => new Date(t.planEnd) < new Date() && t.status !== 'completed').length,
    activeAlerts: alerts.filter(a => a.status === 'active').length,
  }

  const completionRate = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0
  const overdueRate = stats.totalTasks > 0 ? Math.round((stats.overdueTasks / stats.totalTasks) * 100) : 0

  return (
    <div className="p-6 space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">仪表盘</h1>
          <p className="text-muted">项目进度概览和关键指标</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-brand/20 text-brand border border-brand/30 rounded-lg hover:bg-brand/30 transition-colors">
            刷新数据
          </button>
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
            导出报告
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-sm text-blue-400 font-medium">+12% 较上周</span>
          </div>
          <h3 className="text-2xl font-bold text-text mb-1">{stats.totalProjects}</h3>
          <p className="text-muted">总项目数</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-sm text-green-400 font-medium">+8% 较上周</span>
          </div>
          <h3 className="text-2xl font-bold text-text mb-1">{stats.activeProjects}</h3>
          <p className="text-muted">活跃项目</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-sm text-purple-400 font-medium">+5% 较上周</span>
          </div>
          <h3 className="text-2xl font-bold text-text mb-1">{completionRate}%</h3>
          <p className="text-muted">完成率</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
            </div>
            <span className="text-sm text-orange-400 font-medium">{stats.activeAlerts} 个预警</span>
          </div>
          <h3 className="text-2xl font-bold text-text mb-1">{overdueRate}%</h3>
          <p className="text-muted">延期率</p>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 项目进度图表 */}
        <div className="lg:col-span-2 bg-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text">项目进度趋势</h2>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-xs bg-brand/20 text-brand rounded-lg">本周</button>
              <button className="px-3 py-1 text-xs bg-white/5 text-muted rounded-lg">本月</button>
              <button className="px-3 py-1 text-xs bg-white/5 text-muted rounded-lg">本年</button>
            </div>
          </div>
          
          {/* 模拟图表 */}
          <div className="h-64 bg-gradient-to-br from-brand/10 to-brand2/10 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-brand/50 mx-auto mb-4" />
              <p className="text-muted">进度趋势图表</p>
              <p className="text-sm text-muted">Chart.js 图表组件</p>
            </div>
          </div>
        </div>

        {/* 最近活动 */}
        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-text mb-6">最近活动</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-text">任务 "用户登录功能" 已完成</p>
                <p className="text-xs text-muted">2小时前</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-text">新成员 "李四" 加入项目</p>
                <p className="text-xs text-muted">4小时前</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-text">项目 "CRM系统" 延期预警</p>
                <p className="text-xs text-muted">6小时前</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-text">里程碑 "需求分析" 即将到期</p>
                <p className="text-xs text-muted">1天前</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 项目概览 */}
      <div className="bg-panel border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text">项目概览</h2>
          <button className="text-brand hover:text-brand/80 transition-colors">查看全部</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.slice(0, 6).map((project) => (
            <div key={project.id} className="bg-panel2 border border-white/5 rounded-lg p-4 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-text">{project.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  project.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {project.status === 'active' ? '进行中' : 
                   project.status === 'completed' ? '已完成' : '规划中'}
                </span>
              </div>
              
              <p className="text-sm text-muted mb-3 line-clamp-2">{project.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>进度</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-gradient-to-r from-brand to-brand2 h-2 rounded-full" style={{width: '65%'}} />
                </div>
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>剩余 15 天</span>
                  <span>{project.memberIds.length} 成员</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 预警信息 */}
      {stats.activeAlerts > 0 && (
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl font-semibold text-text">需要关注的预警</h2>
          </div>
          
          <div className="space-y-3">
            {alerts.filter(a => a.status === 'active').slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  alert.level === 'critical' ? 'bg-red-500' :
                  alert.level === 'high' ? 'bg-orange-500' :
                  'bg-yellow-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-text">{alert.reason}</p>
                  <p className="text-xs text-muted">{alert.resourceId}</p>
                </div>
                <button className="text-xs px-3 py-1 bg-brand/20 text-brand rounded-lg hover:bg-brand/30 transition-colors">
                  处理
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
