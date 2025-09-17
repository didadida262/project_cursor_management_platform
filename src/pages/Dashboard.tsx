import React, { useEffect } from 'react'
import { useAppStore } from '../store'
import { StatsCard } from '../components/Dashboard/StatsCard'
import { ChartCard } from '../components/Dashboard/ChartCard'
import { AlertList } from '../components/Dashboard/AlertList'
import { mockDashboardData } from '../data/mockData'
import {
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  FolderOpen,
} from 'lucide-react'

export const Dashboard: React.FC = () => {
  const { dashboardData, setDashboardData, refreshDashboardData } = useAppStore()

  useEffect(() => {
    // 模拟数据加载
    setDashboardData(mockDashboardData)
  }, [setDashboardData])

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      </div>
    )
  }

  // 周趋势图表数据
  const weeklyTrendData = {
    labels: dashboardData.weeklyTrend.map(item => item.date),
    datasets: [
      {
        label: '按期完成',
        data: dashboardData.weeklyTrend.map(item => item.onTime),
        borderColor: '#3ddc97',
        backgroundColor: 'rgba(61, 220, 151, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: '延期完成',
        data: dashboardData.weeklyTrend.map(item => item.delayed),
        borderColor: '#ff5c7a',
        backgroundColor: 'rgba(255, 92, 122, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }

  return (
    <div className="space-y-6 panel-scroll">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">仪表盘</h1>
          <p className="text-muted mt-1">项目进度概览和关键指标</p>
        </div>
        <button
          onClick={refreshDashboardData}
          className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
        >
          刷新数据
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="总项目数"
          value={dashboardData.totalProjects}
          change={{ value: 12, type: 'increase' }}
          icon={FolderOpen}
          color="blue"
          description="活跃项目"
        />
        <StatsCard
          title="按期率"
          value={`${dashboardData.onTimeRate}%`}
          change={{ value: 5, type: 'increase' }}
          icon={CheckCircle}
          color="green"
          description="较上周提升"
        />
        <StatsCard
          title="延期率"
          value={`${dashboardData.delayRate}%`}
          change={{ value: 3, type: 'decrease' }}
          icon={AlertTriangle}
          color="red"
          description="较上周下降"
        />
        <StatsCard
          title="活跃任务"
          value={dashboardData.activeTasks}
          change={{ value: 8, type: 'increase' }}
          icon={Clock}
          color="purple"
          description="进行中任务"
        />
      </div>

      {/* 图表和预警 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 周趋势图表 */}
        <div className="lg:col-span-2">
          <ChartCard
            title="周完成趋势"
            data={weeklyTrendData}
            height={300}
          />
        </div>

        {/* 预警列表 */}
        <div>
          <AlertList alerts={dashboardData.recentAlerts} />
        </div>
      </div>

      {/* 项目进度 */}
      <div className="bg-panel border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text">项目进度</h3>
          <button className="text-brand hover:text-brand/80 text-sm font-medium">
            查看全部
          </button>
        </div>
        
        <div className="space-y-4">
          {dashboardData.projectProgress.map((project) => (
            <div key={project.projectId} className="p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-text">{project.projectName}</h4>
                  <p className="text-sm text-muted">{project.owner} · {project.department}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-text">{project.progress}%</div>
                  <div className="text-xs text-muted">完成度</div>
                </div>
              </div>
              
              <div className="w-full bg-white/5 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-brand to-brand2 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted">
                <span>状态: {project.status === 'active' ? '进行中' : '已完成'}</span>
                <span>负责人: {project.owner}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 快速操作 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium text-text">创建新项目</h4>
              <p className="text-sm text-muted">开始新的项目规划</p>
            </div>
          </div>
          <button className="w-full py-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-colors">
            立即创建
          </button>
        </div>

        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h4 className="font-medium text-text">分配任务</h4>
              <p className="text-sm text-muted">为团队成员分配任务</p>
            </div>
          </div>
          <button className="w-full py-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors">
            分配任务
          </button>
        </div>

        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h4 className="font-medium text-text">团队管理</h4>
              <p className="text-sm text-muted">管理团队成员和权限</p>
            </div>
          </div>
          <button className="w-full py-2 bg-purple-500/10 text-purple-500 rounded-lg hover:bg-purple-500/20 transition-colors">
            管理团队
          </button>
        </div>
      </div>
    </div>
  )
}
