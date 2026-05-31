import initialArticles from '../data/articles.json'

const STORAGE_KEY = 'luvera-articles'

const initArticles = () => {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialArticles))
    return initialArticles
  }
  return JSON.parse(existing)
}

export const getArticles = () => {
  return initArticles()
}

export const getArticleById = (id) => {
  return getArticles().find((a) => a.id === parseInt(id))
}

export const addArticle = (article) => {
  const articles = getArticles()
  const newArticle = {
    ...article,
    id: articles.length > 0 ? Math.max(...articles.map((a) => a.id)) + 1 : 1,
    date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase(),
  }
  articles.push(newArticle)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
  return newArticle
}

export const updateArticle = (id, updatedData) => {
  const articles = getArticles()
  const index = articles.findIndex((a) => a.id === parseInt(id))
  if (index >= 0) {
    articles[index] = { ...articles[index], ...updatedData }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
    return articles[index]
  }
  return null
}

export const deleteArticle = (id) => {
  const articles = getArticles().filter((a) => a.id !== parseInt(id))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
  return articles
}

export const resetArticles = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialArticles))
  return initialArticles
}