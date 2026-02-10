import React, { useState } from 'react'
import { NavigationProps } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { AccountLayout } from '../components/AccountLayout'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { User, Lock, Trash2, AlertTriangle, Save } from 'lucide-react'

const AccountSettingsPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { user, updateUserProfile, deleteAccount } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  const handleUpdateProfile = async () => {
    setLoading(true)
    setMessage(null)
    try {
      await updateUserProfile({ name, email })
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' })
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' })
      return
    }
    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' })
      return
    }
    
    setLoading(true)
    setMessage(null)
    try {
      setMessage({ type: 'success', text: 'Password changed successfully!' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to change password' })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setMessage({ type: 'error', text: 'Please type DELETE to confirm' })
      return
    }
    
    setLoading(true)
    try {
      await deleteAccount()
      onNavigate('landing')
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to delete account' })
      setLoading(false)
    }
  }

  return (
    <AccountLayout onNavigate={onNavigate} activeTab="settings">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your account information and preferences</p>
        </div>

        {message && (
          <Card className={`p-4 ${message.type === 'success' ? 'bg-green-50 border-green-200 dark:bg-green-900/20' : 'bg-red-50 border-red-200 dark:bg-red-900/20'}`}>
            <p className={message.type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}>
              {message.text}
            </p>
          </Card>
        )}

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Profile Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="Enter your email"
              />
            </div>

            <Button onClick={handleUpdateProfile} disabled={loading} className="w-full sm:w-auto">
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Change Password</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="Enter new password (min 8 characters)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="Confirm new password"
              />
            </div>

            <Button onClick={handleChangePassword} disabled={loading || !currentPassword || !newPassword} className="w-full sm:w-auto">
              <Lock className="w-4 h-4 mr-2" />
              {loading ? 'Changing...' : 'Change Password'}
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-red-200 dark:border-red-800">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Danger Zone</h2>
          </div>

          {!showDeleteConfirm ? (
            <div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Once you delete your account, there is no going back. This will permanently delete:
              </p>
              <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-6 space-y-2">
                <li>All your quiz progress and exam results</li>
                <li>Your subscription and purchased certifications</li>
                <li>Your account information and preferences</li>
                <li>All associated data</li>
              </ul>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(true)}
                className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete My Account
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200 font-semibold mb-2">⚠️ This action cannot be undone!</p>
                <p className="text-red-700 dark:text-red-300 text-sm">
                  Please type <strong>DELETE</strong> to confirm account deletion.
                </p>
              </div>

              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full px-4 py-2 border border-red-300 dark:border-red-800 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="Type DELETE to confirm"
              />

              <div className="flex gap-3">
                <Button
                  onClick={handleDeleteAccount}
                  disabled={loading || deleteConfirmText !== 'DELETE'}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {loading ? 'Deleting...' : 'Permanently Delete Account'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    setDeleteConfirmText('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </AccountLayout>
  )
}

export default AccountSettingsPage
