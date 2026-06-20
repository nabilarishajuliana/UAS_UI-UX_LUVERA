import initialUsers from '../data/users.json'

const STORAGE_KEY = 'luvera-users'

const initUsers = () => {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers))
    return initialUsers
  }
  return JSON.parse(existing)
}

export const getUsers = () => {
  return initUsers()
}

export const getCustomers = () => {
  return getUsers().filter((u) => u.role === 'customer')
}

export const getUserById = (id) => {
  return getUsers().find((u) => u.id === parseInt(id))
}

export const deleteUser = (id) => {
  const users = getUsers().filter((u) => u.id !== parseInt(id))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  return users
}