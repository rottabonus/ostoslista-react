import axios from 'axios'

const getAll = async () => {
  const request = await axios.get('/api/categories')
  return request.data
}

const create = async (newItem, config) => {
  const response = await axios.post('/api/categories', newItem, config)
  return response.data
}

const update = async (id, item, config) => {
  const response = await axios.put(`/api/categories/${id}`, item, config)
  return response.data
}

const remove = async (id, config) => {
  const response = await axios.delete(`/api/categories/${id}`, config)
  return response.data
}

export default { getAll, create, update, remove }