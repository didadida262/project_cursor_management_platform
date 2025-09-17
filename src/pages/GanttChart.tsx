import React, { useState, useRef, useEffect } from 'react'
import { useAppStore } from '../store'
import { Task } from '../types'
import { 
  Calendar,
  Filter,
  Download,
  ZoomIn,
  ZoomOut,
  Move,
  Settings
} from 'lucide-react'
import { formatDate } from '../utils'

export const GanttChart: React.FC = () => {
  const { tasks, projects } = useAppStore()
  const [selectedProject, setSelectedProject] = useState('all')
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week')
  const [startDate, setStartDate] = useState(new Date())
  const [zoom, setZoom] = useState(1)
  const ganttRef = useRef<HTMLDivElement>(null)

  const filteredTasks = tasks.filter(task => 
    selectedProject === 'all' || task.projectId === selectedProject
  )

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    return project?.name || '未知项目'
  }

  const getTaskPosition = (task: Task) => {
    const start = new Date(task.planStart)
    const end = new Date(task.planEnd)
    const now = new Date()
    
    const daysDiff = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    
    return {
      left: Math.max(0, daysDiff * 40 * zoom),
      width: Math.max(20, duration * 40 * zoom),
      isOverdue: end < now && task.status !== 'completed'
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      todo: '#6b7280',
      doing: '#3b82f6',
      blocked: '#ef4444',
      completed: '#10b981'
    }
    return colors[status as keyof typeof colors] || '#6b7280'
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
      urgent: '#dc2626'
    }
    return colors[priority as keyof typeof colors] || '#6b7280'
  }

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">甘特图</h1>
          <p className="text-muted mt-1">项目时间线和任务依赖关系</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
            <Download className="w-4 h-4" />
            导出
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
            <Settings className="w-4 h-4" />
            设置
          </button>
        </div>
      </div>

      {/* 工具栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand/50"
          >
            <option value="all">全部项目</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-2 rounded-lg text-sm ${
                viewMode === 'day' ? 'bg-brand text-white' : 'bg-white/5 text-muted hover:bg-white/10'
              }`}
            >
              日
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-2 rounded-lg text-sm ${
                viewMode === 'week' ? 'bg-brand text-white' : 'bg-white/5 text-muted hover:bg-white/10'
              }`}
            >
              周
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-2 rounded-lg text-sm ${
                viewMode === 'month' ? 'bg-brand text-white' : 'bg-white/5 text-muted hover:bg-white/10'
              }`}
            >
              月
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm text-muted">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 甘特图主体 */}
      <div className="bg-panel border border-white/10 rounded-xl overflow-hidden">
        <div className="flex">
          {/* 任务列表 */}
          <div className="w-80 border-r border-white/10">
            <div className="p-4 border-b border-white/10">
              <h3 className="font-semibold text-text">任务列表</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredTasks.map((task) => (
                <div key={task.id} className="p-3 border-b border-white/5 hover:bg-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getStatusColor(task.status) }}
                    />
                    <h4 className="font-medium text-text text-sm">{task.title}</h4>
                  </div>
                  <p className="text-xs text-muted">{getProjectName(task.projectId)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-muted">
                      {task.priority}
                    </span>
                    <span className="text-xs text-muted">{task.estimate}h</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 时间轴 */}
          <div className="flex-1 overflow-x-auto">
            <div className="min-w-max">
              {/* 时间轴头部 */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted" />
                  <span className="text-sm text-muted">时间轴</span>
                </div>
              </div>

              {/* 甘特图内容 */}
              <div className="relative p-4" ref={ganttRef}>
                {/* 时间网格 */}
                <div className="absolute inset-0">
                  {Array.from({ length: 30 }, (_, i) => {
                    const date = new Date(startDate)
                    date.setDate(date.getDate() + i)
                    return (
                      <div
                        key={i}
                        className="absolute top-0 bottom-0 border-l border-white/10"
                        style={{ left: i * 40 * zoom }}
                      >
                        <div className="text-xs text-muted p-2">
                          {formatDate(date)}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* 任务条 */}
                <div className="relative z-10">
                  {filteredTasks.map((task, index) => {
                    const position = getTaskPosition(task)
                    return (
                      <div
                        key={task.id}
                        className="absolute h-8 rounded-lg flex items-center px-2 text-xs text-white font-medium"
                        style={{
                          left: position.left,
                          width: position.width,
                          top: index * 40 + 10,
                          backgroundColor: position.isOverdue ? '#ef4444' : getStatusColor(task.status),
                          opacity: task.status === 'completed' ? 0.7 : 1
                        }}
                      >
                        <div className="truncate">{task.title}</div>
                        <div className="ml-2 text-xs opacity-75">
                          {task.progress}%
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* 当前时间线 */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 图例 */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500" />
          <span className="text-muted">待办</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-muted">进行中</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-muted">阻塞</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-muted">已完成</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-muted">已延期</span>
        </div>
      </div>
    </div>
  )
}
