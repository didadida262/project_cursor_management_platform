import React, { useState } from 'react'
import { useAppStore } from '../store'
import { Alert, AlertLevel } from '../types'
import { 
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Bell,
  BellOff,
  MoreVertical,
  Eye,
  Archive
} from 'lucide-react'
import { formatDateTime, getAlertLevelColor } from '../utils'

export const AlertCenter: React.FC = () => {
  const { alerts, updateAlert, deleteAlert } = useAppStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState<AlertLevel | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'resolved' | 'dismissed'>('all')

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.resourceId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = filterLevel === 'all' || alert.level === filterLevel
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus
    return matchesSearch && matchesLevel && matchesStatus
  })

  const getLevelText = (level: AlertLevel) => {
    const levelMap = {
      low: '低',
      medium: '中',
      high: '高',
      critical: '严重'
    }
    return levelMap[level] || level
  }

  const getLevelIcon = (level: AlertLevel) => {
    const icons = {
      low: Clock,
      medium: AlertTriangle,
      high: AlertTriangle,
      critical: XCircle
    }
    return icons[level] || AlertTriangle
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      active: '活跃',
      resolved: '已解决',
      dismissed: '已忽略'
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'text-red-500',
      resolved: 'text-green-500',
      dismissed: 'text-gray-500'
    }
    return colors[status as keyof typeof colors] || 'text-gray-500'
  }

  const handleResolve = async (alertId: string) => {
    await updateAlert(alertId, { status: 'resolved' })
  }

  const handleDismiss = async (alertId: string) => {
    await updateAlert(alertId, { status: 'dismissed' })
  }

  const alertStats = {
    total: alerts.length,
    active: alerts.filter(a => a.status === 'active').length,
    resolved: alerts.filter(a => a.status === 'resolved').length,
    dismissed: alerts.filter(a => a.status === 'dismissed').length
  }

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">预警中心</h1>
          <p className="text-muted mt-1">监控项目风险和异常情况</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
            <BellOff className="w-4 h-4" />
            全部忽略
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
            <Archive className="w-4 h-4" />
            归档已解决
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-panel border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted">总预警</p>
              <p className="text-2xl font-bold text-text">{alertStats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-panel border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-muted">活跃预警</p>
              <p className="text-2xl font-bold text-red-500">{alertStats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-panel border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted">已解决</p>
              <p className="text-2xl font-bold text-green-500">{alertStats.resolved}</p>
            </div>
          </div>
        </div>

        <div className="bg-panel border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-muted">已忽略</p>
              <p className="text-2xl font-bold text-gray-500">{alertStats.dismissed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="搜索预警..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/50"
          />
        </div>
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value as AlertLevel | 'all')}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
        >
          <option value="all">全部级别</option>
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
          <option value="critical">严重</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
        >
          <option value="all">全部状态</option>
          <option value="active">活跃</option>
          <option value="resolved">已解决</option>
          <option value="dismissed">已忽略</option>
        </select>
      </div>

      {/* 预警列表 */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">暂无预警</h3>
            <p className="text-muted">当前没有符合条件的预警信息</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const Icon = getLevelIcon(alert.level)
            return (
              <div
                key={alert.id}
                className="bg-panel border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  {/* 预警图标 */}
                  <div className={`p-3 rounded-lg ${getAlertLevelColor(alert.level).replace('text-', 'bg-').replace('-500', '-500/20')}`}>
                    <Icon className={`w-5 h-5 ${getAlertLevelColor(alert.level)}`} />
                  </div>

                  {/* 预警内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getAlertLevelColor(alert.level)}`}>
                            {getLevelText(alert.level)}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(alert.status)}`}>
                            {getStatusText(alert.status)}
                          </span>
                          <span className="text-xs text-muted">
                            {alert.resourceType === 'project' ? '项目' : '任务'}
                          </span>
                        </div>
                        <h3 className="font-semibold text-text mb-1">{alert.reason}</h3>
                        <p className="text-sm text-muted">
                          资源ID: {alert.resourceId} • {formatDateTime(alert.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-1 rounded hover:bg-white/10">
                          <Eye className="w-4 h-4 text-muted" />
                        </button>
                        <button className="p-1 rounded hover:bg-white/10">
                          <MoreVertical className="w-4 h-4 text-muted" />
                        </button>
                      </div>
                    </div>

                    {/* 预警详情 */}
                    <div className="mt-3 p-3 bg-white/5 rounded-lg">
                      <p className="text-sm text-muted mb-2">预警类型: {alert.type}</p>
                      {alert.predictedDelayDays && (
                        <p className="text-sm text-muted mb-2">
                          预计延期: {alert.predictedDelayDays} 天
                        </p>
                      )}
                      <p className="text-sm text-muted">
                        通知对象: {alert.notifiedTo.length} 人
                      </p>
                    </div>

                    {/* 操作按钮 */}
                    {alert.status === 'active' && (
                      <div className="flex items-center gap-2 mt-4">
                        <button
                          onClick={() => handleResolve(alert.id)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          标记为已解决
                        </button>
                        <button
                          onClick={() => handleDismiss(alert.id)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gray-500/20 text-gray-500 rounded-lg hover:bg-gray-500/30 transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          忽略预警
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
