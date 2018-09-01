import axios from 'axios'

const getAll = async () => {
  const request = await axios.get('/api/shoppinglist')
  return request.data
}

const add = async (newItem) => {
  const response = await axios.post('/api/shoppinglist', newItem)
  return response.data
}

const updateAmount = async (id, item) => {
  const response = await axios.put(`/api/shoppinglist/${id}`, item)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`/api/shoppinglist/${id}`)
  return response.data
}

const resolveList = async (emptyobj) => {
  const response = await axios.post('/api/shoppinglist/resolve', emptyobj)
  return response.data
}

const newlist = async (date) => {
  const response = await axios.post('/api/shoppinglist/new', date)
  return response.data
}

const getHistory = async () => {
  const response = await axios.get('/api/shoppinglist/history')
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`/api/shoppinglist/${id}`)
  return response.data
}

export default { getAll, add, updateAmount, remove, resolveList, newlist, getHistory, getOne }