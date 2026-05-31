import initialTransactions from '../data/transactions.json'

const STORAGE_KEY = 'luvera-transactions'

const initTransactions = () => {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTransactions))
    return initialTransactions
  }
  return JSON.parse(existing)
}

export const getTransactions = () => {
  return initTransactions()
}

export const getTransactionById = (id) => {
  return getTransactions().find((t) => t.id === id)
}

export const updateTransactionStatus = (id, newStatus) => {
  const transactions = getTransactions()
  const index = transactions.findIndex((t) => t.id === id)
  if (index >= 0) {
    transactions[index].status = newStatus
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    return transactions[index]
  }
  return null
}

export const deleteTransaction = (id) => {
  const transactions = getTransactions().filter((t) => t.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  return transactions
}

export const resetTransactions = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTransactions))
  return initialTransactions
}