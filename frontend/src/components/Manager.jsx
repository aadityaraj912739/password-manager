import React from 'react'
import axios from 'axios'

const Manager = () => {

    const [form, setForm] = React.useState({
        website: "",
        username: "",
        password: ""
    })

    const [passwords, setPasswords] = React.useState([])
    const [editingId, setEditingId] = React.useState(null)

    const fetchPasswords = async () => {
        try {
            const response = await axios.get('/api/user/passwords')
            setPasswords(response.data.passwords || [])
        } catch (error) {
            console.error(error)
            alert('Failed to load passwords')
        }
    }

    React.useEffect(() => {
        fetchPasswords()
    }, [])

    // Copy to clipboard
    const copyToClipboard = (text) => {
        try {
            navigator.clipboard.writeText(text)
            alert("Copied!")
        } catch (error) {
            console.error(error)
        }
    }

    // Handle input change
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // Save password
    const savePassword = async () => {

        if (!form.website || !form.username || !form.password) {
            alert("Please fill all fields!")
            return
        }

        try {
            if (editingId) {
                const response = await axios.put(`/api/user/editPassword/${editingId}`, form)
                const updatedPassword = response.data.password

                setPasswords((prev) => prev.map((item) => (
                    item._id === editingId ? updatedPassword : item
                )))
            } else {
                const response = await axios.post('/api/user/savePassword', form)
                const savedPassword = response.data.password
                setPasswords((prev) => [...prev, savedPassword])
            }

            setForm({
                website: "",
                username: "",
                password: ""
            })
            setEditingId(null)
        } catch (error) {
            console.error(error)
            alert('Failed to save password')
        }
    }

    // ✅ DELETE
    const deleteHandle = async (id) => {
        try {
            await axios.delete(`/api/user/deletePassword/${id}`)
            setPasswords((prev) => prev.filter((item) => item._id !== id))

            if (editingId === id) {
                setEditingId(null)
                setForm({ website: '', username: '', password: '' })
            }
        } catch (error) {
            console.error(error)
            alert('Failed to delete password')
        }
    }

    // ✅ EDIT
    const editHandle = (item) => {
        setEditingId(item._id)

        setForm({
            website: item.website,
            username: item.username,
            password: item.password
        })
    }

    return (
        <div className="min-h-screen flex bg-slate-900">

            <div className="bg-slate-50 w-full shadow-md">

                {/* Heading */}
                <div className="text-center font-bold text-3xl p-4">
                    <span className="text-green-700">&lt;</span>
                    <span className="text-black">
                        Pass<span className="text-green-700">OP</span>
                    </span>
                    <span className="text-green-700">&gt;</span>
                </div>

                {/* Subtitle */}
                <p className="text-green-900 text-lg text-center mb-4">
                    Your own Password Manager
                </p>

                {/* Form */}
                <div className="flex flex-col p-4 gap-4">

                    <input
                        className="rounded-full border border-green-400 w-full px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="text"
                        placeholder="Enter Website"
                        value={form.website}
                        name='website'
                        onChange={handleChange}
                    />

                    <div className="flex w-full gap-3 items-center">

                        <input
                            className="rounded-full border border-green-400 w-full px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                            type="text"
                            placeholder="Username"
                            value={form.username}
                            name='username'
                            onChange={handleChange}
                        />

                        <input
                            className="rounded-full border border-green-400 w-full px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                            type="text"
                            placeholder="Password"
                            value={form.password}
                            name='password'
                            onChange={handleChange}
                        />

                        <button
                            onClick={savePassword}
                            className="bg-green-600 hover:bg-green-800 transition text-white font-bold px-4 py-2 rounded-full whitespace-nowrap">
                            {editingId ? 'Update Password' : 'Add Password'}
                        </button>

                    </div>
                </div>

                {/* Table */}
                <div className="p-4">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>

                    {passwords.length === 0 ? (
                        <p className='text-red-500'>No password saved yet!</p>
                    ) : (
                        <table className="table-auto w-full border-collapse">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Website</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>

                            <tbody className='bg-slate-200 text-black'>
                                {passwords.map((item) => (
                                    <tr key={item._id} className="border-b border-gray-300">

                                        {/* Website */}
                                        <td className='py-2 text-center'>
                                            <a href={item.website} target='_blank' rel='noopener noreferrer' className="text-blue-600 underline">
                                                {item.website}
                                            </a>
                                        </td>

                                        {/* Username */}
                                        <td className='py-2'>
                                            <div className="flex justify-center items-center gap-3">
                                                <span>{item.username}</span>
                                                <button
                                                    onClick={() => copyToClipboard(item.username)}
                                                    className="bg-green-600 hover:bg-green-800 px-2 py-1 rounded-md text-xs text-white"
                                                >
                                                    📋
                                                </button>
                                            </div>
                                        </td>

                                        {/* Password */}
                                        <td className='py-2'>
                                            <div className="flex justify-center items-center gap-3">
                                                <span>{item.password}</span>
                                                <button
                                                    onClick={() => copyToClipboard(item.password)}
                                                    className="bg-green-600 hover:bg-green-800 px-2 py-1 rounded-md text-xs text-white"
                                                >
                                                    📋
                                                </button>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className='py-2 text-center'>
                                            <div className="flex justify-center gap-3">
                                                <button
                                                    onClick={() => editHandle(item)}
                                                    className="bg-blue-500 hover:bg-blue-700 px-2 py-1 rounded text-white text-xs"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => deleteHandle(item._id)}
                                                    className="bg-red-500 hover:bg-red-700 px-2 py-1 rounded text-white text-xs"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Manager