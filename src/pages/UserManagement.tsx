import React, { useState, useEffect } from 'react'
import { useAppStore } from '../store'
import { User, UserRole } from '../types'
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Shield,
  Building,
  UserCheck,
  UserX,
  Settings
} from 'lucide-react'
import { formatDate } from '../utils'

interface UserFormData {
  name: string
  email: string
  role: UserRole
  department: string
  avatar?: string
}

const roleLabels: Record<UserRole, string> = {
  admin: '管理员',
  owner: '项目负责人',
  member: '成员',
  observer: '观察者'
}

const roleColors: Record<UserRole, string> = {
  admin: 'bg-red-500/20 text-red-400 border-red-500/30',
  owner: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  member: 'bg-green-500/20 text-green-400 border-green-500/30',
  observer: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}

const departments = ['技术部', '产品部', '设计部', '运营部', '市场部', '财务部', '人事部']

export const UserManagement: React.FC = () => {
  const { users, addUser, updateUser, deleteUser } = useAppStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all')
  const [departmentFilter, setDepartmentFilter] = useState<string>('all')
  const [showUserModal, setShowUserModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'member',
    department: '',
    avatar: ''
  })

  // 筛选用户
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter
    
    return matchesSearch && matchesRole && matchesDepartment
  })

  // 重置表单
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'member',
      department: '',
      avatar: ''
    })
    setEditingUser(null)
  }

  // 打开添加用户模态框
  const handleAddUser = () => {
    resetForm()
    setShowUserModal(true)
  }

  // 打开编辑用户模态框
  const handleEditUser = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      avatar: user.avatar || ''
    })
    setEditingUser(user)
    setShowUserModal(true)
  }

  // 保存用户
  const handleSaveUser = () => {
    if (!formData.name || !formData.email || !formData.department) {
      alert('请填写所有必填字段')
      return
    }

    if (editingUser) {
      // 编辑用户
      updateUser(editingUser.id, {
        ...formData,
        updatedAt: new Date()
      })
    } else {
      // 添加用户
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      addUser(newUser)
    }

    setShowUserModal(false)
    resetForm()
  }

  // 删除用户
  const handleDeleteUser = (userId: string) => {
    deleteUser(userId)
    setShowDeleteConfirm(null)
  }

  // 获取用户统计
  const getUserStats = () => {
    const total = users.length
    const admins = users.filter(u => u.role === 'admin').length
    const owners = users.filter(u => u.role === 'owner').length
    const members = users.filter(u => u.role === 'member').length
    const observers = users.filter(u => u.role === 'observer').length

    return { total, admins, owners, members, observers }
  }

  const stats = getUserStats()

  return (
    <div className="space-y-6 panel-scroll">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">用户管理</h1>
          <p className="text-muted mt-1">管理系统用户和权限</p>
        </div>
        <button
          onClick={handleAddUser}
          className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          添加用户
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-panel border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text">{stats.total}</div>
              <div className="text-sm text-muted">总用户数</div>
            </div>
          </div>
        </div>

        <div className="bg-panel border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text">{stats.admins}</div>
              <div className="text-sm text-muted">管理员</div>
            </div>
          </div>
        </div>

        <div className="bg-panel border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text">{stats.owners}</div>
              <div className="text-sm text-muted">项目负责人</div>
            </div>
          </div>
        </div>

        <div className="bg-panel border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text">{stats.members}</div>
              <div className="text-sm text-muted">成员</div>
            </div>
          </div>
        </div>

        <div className="bg-panel border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
              <UserX className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text">{stats.observers}</div>
              <div className="text-sm text-muted">观察者</div>
            </div>
          </div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-panel border border-white/10 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="搜索用户名或邮箱..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-bg border border-white/10 rounded-lg text-text placeholder-muted focus:outline-none focus:border-brand"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
              className="px-3 py-2 bg-bg border border-white/10 rounded-lg text-text focus:outline-none focus:border-brand"
            >
              <option value="all">所有角色</option>
              <option value="admin">管理员</option>
              <option value="owner">项目负责人</option>
              <option value="member">成员</option>
              <option value="observer">观察者</option>
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 bg-bg border border-white/10 rounded-lg text-text focus:outline-none focus:border-brand"
            >
              <option value="all">所有部门</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 用户列表 */}
      <div className="bg-panel border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted">用户</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted">角色</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted">部门</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted">创建时间</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand to-brand2 flex items-center justify-center text-white font-medium">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          user.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-text">{user.name}</div>
                        <div className="text-sm text-muted">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${roleColors[user.role]}`}>
                      {roleLabels[user.role]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted" />
                      <span className="text-text">{user.department}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 text-muted hover:text-brand hover:bg-brand/10 rounded-lg transition-colors"
                        title="编辑"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(user.id)}
                        className="p-2 text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted/50 mx-auto mb-4" />
            <p className="text-muted">没有找到用户</p>
          </div>
        )}
      </div>

      {/* 添加/编辑用户模态框 */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-panel border border-white/10 rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text">
                {editingUser ? '编辑用户' : '添加用户'}
              </h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-muted hover:text-text transition-colors"
              >
                <UserX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">姓名 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-bg border border-white/10 rounded-lg text-text focus:outline-none focus:border-brand"
                  placeholder="请输入姓名"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">邮箱 *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-bg border border-white/10 rounded-lg text-text focus:outline-none focus:border-brand"
                  placeholder="请输入邮箱"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">角色 *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full px-3 py-2 bg-bg border border-white/10 rounded-lg text-text focus:outline-none focus:border-brand"
                >
                  <option value="member">成员</option>
                  <option value="owner">项目负责人</option>
                  <option value="admin">管理员</option>
                  <option value="observer">观察者</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">部门 *</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 bg-bg border border-white/10 rounded-lg text-text focus:outline-none focus:border-brand"
                >
                  <option value="">请选择部门</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">头像URL</label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-3 py-2 bg-bg border border-white/10 rounded-lg text-text focus:outline-none focus:border-brand"
                  placeholder="请输入头像URL（可选）"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowUserModal(false)}
                className="flex-1 px-4 py-2 border border-white/10 text-text rounded-lg hover:bg-white/5 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSaveUser}
                className="flex-1 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
              >
                {editingUser ? '保存' : '添加'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 删除确认模态框 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-panel border border-white/10 rounded-xl p-6 w-full max-w-md mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">确认删除</h3>
              <p className="text-muted mb-6">确定要删除这个用户吗？此操作无法撤销。</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-white/10 text-text rounded-lg hover:bg-white/5 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => handleDeleteUser(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
