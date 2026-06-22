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
  // Reset semua data admin ke awal
  localStorage.removeItem('luvera-products')
  localStorage.removeItem('luvera-articles')
  localStorage.removeItem('luvera-transactions')
  localStorage.removeItem('luvera-users')
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

// --- FUNGSI BARU UNTUK UPDATE PROFIL SESSION (ADMIN / USER) ---
export const updateCurrentUserProfile = (updatedData) => {
  const currentUser = getCurrentUser()
  if (!currentUser) return null

  // Gabungkan data lama dengan data baru yang di-edit
  const newUserSession = { ...currentUser, ...updatedData }
  
  // Save kembali ke session login
  localStorage.setItem('luvera-user', JSON.stringify(newUserSession))

  // OPTIONAL: Jika kamu juga ingin agar perubahan data admin ini masuk 
  // ke list 'luvera-users' (agar sinkron di tabel Customer/User), kita handle di sini:
  const allUsersData = localStorage.getItem('luvera-users')
  if (allUsersData) {
    const parsedUsers = JSON.parse(allUsersData)
    const updatedList = parsedUsers.map((u) => u.id === newUserSession.id ? newUserSession : u)
    localStorage.setItem('luvera-users', JSON.stringify(updatedList))
  }

  return newUserSession
}