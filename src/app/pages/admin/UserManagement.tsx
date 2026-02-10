import React, { useState, useEffect } from 'react'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Loader2, Users, Search } from 'lucide-react'

const API_BASE = 'https://a9x2daz2vg.execute-api.ap-southeast-2.amazonaws.com'

interface User {
  userId: string
  email: string
  name?: string
  createdAt: string
  status: string
  enabled?: boolean
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/users`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error('Failed to fetch users:', error)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(u => 
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">User Management</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300">View and manage all platform users</p>
        </div>
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <Users className="w-5 h-5" />
          <span className="font-semibold">{users.length} Total Users</span>
        </div>
      </div>

      <Card className="p-6 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 shadow-xl border-2 border-blue-100 dark:border-slate-700">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="search"
            placeholder="Search users by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all"
          />
        </div>
      </Card>

      <Card className="overflow-hidden bg-white dark:bg-slate-800 shadow-xl border-2 border-slate-100 dark:border-slate-700">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            {search ? 'No users found matching your search' : 'No users registered yet'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Email</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-white">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.userId} className="border-t border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 px-6 text-slate-900 dark:text-white font-medium">{user.name || 'N/A'}</td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-300">{user.email}</td>
                    <td className="py-4 px-6">
                      <Badge className={user.enabled === false ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}>
                        {user.enabled === false ? 'Inactive' : user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

export default UserManagement
