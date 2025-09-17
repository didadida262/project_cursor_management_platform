import React from 'react'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  icon: LucideIcon
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
  description?: string
}

const colorClasses = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  yellow: 'from-yellow-500 to-yellow-600',
  red: 'from-red-500 to-red-600',
  purple: 'from-purple-500 to-purple-600',
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color,
  description,
}) => {
  return (
    <div className="bg-panel border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-muted text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-text mt-1">{value}</p>
          {description && (
            <p className="text-xs text-muted mt-1">{description}</p>
          )}
          {change && (
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium ${
                  change.type === 'increase' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {change.type === 'increase' ? '+' : ''}{change.value}%
              </span>
              <span className="text-xs text-muted ml-1">较上周</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}
