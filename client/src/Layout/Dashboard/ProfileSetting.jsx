// ...existing code...
import React, { useState } from 'react'

const ProfileSetting = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setaddress] = useState('')
  const [msg, setMsg] = useState('')

  const DEFAULTS = {
    name: 'Your Name',
    email: 'email@example.com',
    phone: 'Enter number',
    address:'Enter Address'
  }

  const handleSave = (e) => {
    e.preventDefault()
    const finalName = name.trim() || DEFAULTS.name
    const finalEmail = email.trim() || DEFAULTS.email
    const finalPhone = phone.trim() || DEFAULTS.phone
    const finalAddress = address.trim() || DEFAULTS.address

    // simulate save — replace with API call as needed
    setName(finalName)
    setEmail(finalEmail)
    setPhone(finalPhone)
    setaddress(finalAddress)
    setMsg('Profile saved')
    console.log({ name: finalName, email: finalEmail, phone: finalPhone,address:finalAddress })
    setTimeout(() => setMsg(''), 3000)
  }

  return (
    <div
      className="flex justify-center items-start w-full"
      style={{ padding: 24 }} /* equivalent of p-6 */
    >
      <form
        onSubmit={handleSave}
        className="w-full max-w-md bg-white rounded-md shadow"
        style={{ padding: 24 }} /* form padding (p-6) */
      >
        <h2 style={{ marginBottom: 16 }} className='text-xl font-semibold'>
          Profile Settings
        </h2>

        <label style={{ display: 'block', marginBottom: 12 }}>
          <span className='text-sm text-gray-600'>Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={DEFAULTS.name}
            className='block w-full border rounded'
            style={{ marginTop: 4, padding: '8px 12px' }} /* mt-1, py-2 px-3 */
          />
        </label>

        <label style={{ display: 'block', marginBottom: 12 }}>
          <span className='text-sm text-gray-600'>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={DEFAULTS.email}
            type='email'
            className='block w-full border rounded'
            style={{ marginTop: 4, padding: '8px 12px' }} /* mt-1, py-2 px-3 */
          />
        </label>

        <label style={{ display: 'block', marginBottom: 16 }}>
          <span className='text-sm text-gray-600'>Phone</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={DEFAULTS.phone}
            className='block w-full border rounded'
            style={{ marginTop: 4, padding: '8px 12px' }} /* mt-1, py-2 px-3 */
          />
        </label>

        <label style={{ display: 'block', marginBottom: 16 }}>
          <span className='text-sm text-gray-600'>Adresss</span>
          <input
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            placeholder={DEFAULTS.address}
            className='block w-full border rounded'
            style={{ marginTop: 4, padding: '8px 12px' }} /* mt-1, py-2 px-3 */
          />
        </label>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <button
            type='submit'
            className='bg-btn-primary text-white'
            style={{ padding: '8px 16px', borderRadius: 6 }}
          >
            Save changes
          </button>
          {msg && <span style={{ color: '#16a34a' /* green-600 */ }} className='text-sm'>{msg}</span>}
        </div>
      </form>
    </div>
  )
}

export default ProfileSetting
// ...existing code...