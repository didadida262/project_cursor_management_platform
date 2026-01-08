import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './i18n/config'
import App from './App.jsx'
import { useAppStore } from './store'
import { mockUsers, mockProjects, mockTasks, mockAlerts, mockNotifications } from './data/mockData'

// 初始化模拟数据
const initializeData = () => {
  const { 
    setCurrentUser, 
    addUser, 
    addProject, 
    addTask, 
    addAlert, 
    addNotification 
  } = useAppStore.getState()

  // 设置当前用户
  setCurrentUser(mockUsers[0])

  // 添加用户数据
  mockUsers.forEach(user => addUser(user))

  // 添加项目数据
  mockProjects.forEach(project => addProject(project))

  // 添加任务数据
  mockTasks.forEach(task => addTask(task))

  // 添加预警数据
  mockAlerts.forEach(alert => addAlert(alert))

  // 添加通知数据
  mockNotifications.forEach(notification => addNotification(notification))
}

// 初始化数据
initializeData()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)