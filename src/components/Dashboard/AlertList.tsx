import React from 'react'
import { Alert } from '../../types'
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react'
import { getAlertLevelColor, formatDateTime } from '../../utils'

interface AlertListProps {
  alerts: Alert[]
  onAlertClick?: (alert: Alert) => void
}

const alertIcons = {
  low: Clock,
  medium: AlertTriangle,
  high: AlertTriangle,
  critical: XCircle,
}

const alertColors = {
  low: 'text-gray-500 bg-gray-500/10',
  medium: 'text-yellow-500 bg-yellow-500/10',
  high: 'text-orange-500 bg-orange-500/10',
  critical: 'text-red-500 bg-red-500/10',
}

export const AlertList: React.FC<AlertListProps> = ({ alerts, onAlertClick }) => {
  return (
    <div className="bg-panel border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text">预警中心</h3>
        <span className="text-sm text-muted">{alerts.length} 条预警</span>
      </div>
      
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-muted">暂无预警信息</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const Icon = alertIcons[alert.level]
            return (
              <div
                key={alert.id}
                onClick={() => onAlertClick?.(alert)}
                className="p-4 rounded-lg border border-white/5 hover:border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/5"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${alertColors[alert.level]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${alertColors[alert.level]}`}>
                        {alert.level === 'low' ? '低' : 
                         alert.level === 'medium' ? '中' : 
                         alert.level === 'high' ? '高' : '严重'}
                      </span>
                      <span className="text-xs text-muted">
                        {formatDateTime(alert.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-text mb-1">{alert.reason}</p>
                    <p className="text-xs text-muted">
                      {alert.resourceType === 'project' ? '项目' : '任务'} · {alert.resourceId}
                    </p>
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
