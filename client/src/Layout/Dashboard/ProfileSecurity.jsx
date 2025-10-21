// ...existing code...
import React, { useState } from 'react'

const ProfileSecurity = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [msg, setMsg] = useState('')

  const handleSave = (e) => {
    e.preventDefault()
    if (!newPassword.trim()) {
      setMsg('Please enter a new password')
      return
    }

    // TODO: replace with real API call
    setOldPassword('')
    setNewPassword('')
    setMsg('Password updated')
    setTimeout(() => setMsg(''), 3000)
  }

  return (
    <div className="flex justify-center items-start w-full" style={{ padding: 24 }}>
      <form
        onSubmit={handleSave}
        className="w-full max-w-md bg-white rounded-md shadow"
        style={{ padding: 24 }}
      >
        <h2 className="text-xl font-semibold" style={{ marginBottom: 16 }}>
          Security
        </h2>

        <label style={{ display: 'block', marginBottom: 12 }}>
          <span className="text-sm text-gray-600">Old Password</span>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="block w-full border rounded"
            style={{ marginTop: 4, padding: '8px 12px' }}
            placeholder="Enter old password"
          />
        </label>

        <label style={{ display: 'block', marginBottom: 16 }}>
          <span className="text-sm text-gray-600">New Password</span>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block w-full border rounded"
            style={{ marginTop: 4, padding: '8px 12px' }}
            placeholder="Enter new password"
          />
        </label>

        <div className="flex items-center" style={{ justifyContent: 'space-between', gap: 16 }}>
          <button
            type="submit"
            className="bg-btn-primary text-white"
            style={{ padding: '8px 16px', borderRadius: 6 }}
          >
            Save changes
          </button>

          {msg && <span className="text-sm text-green-600">{msg}</span>}
        </div>
      </form>
    </div>
  )
}

export default ProfileSecurity
// ...existing code...