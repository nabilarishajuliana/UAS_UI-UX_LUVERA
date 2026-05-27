import users from '../data/users.json'

// Login — cek email di users.json, password dummy "password123" untuk semua
export const login = (email, password) => {
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  )

  if (!user) {
    return { success: false, message: 'Email not found' }
  }

  // Password dummy — semua user pakai "password123"
  if (password !== 'password123') {
    return { success: false, message: 'Wrong password' }
  }

  // Simpan ke localStorage
  localStorage.setItem('luvera-user', JSON.stringify(user))
  return { success: true, user }
}

// Logout
export const logout = () => {
  localStorage.removeItem('luvera-user')
}

// Get current user
export const getCurrentUser = () => {
  const data = localStorage.getItem('luvera-user')
  return data ? JSON.parse(data) : null
}

// Cek udah login belum
export const isLoggedIn = () => {
  return getCurrentUser() !== null
}

// Cek apakah admin
export const isAdmin = () => {
  const user = getCurrentUser()
  return user && user.role === 'admin'
}