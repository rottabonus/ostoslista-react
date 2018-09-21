import axios from 'axios'

const getAll = async () => {
  const request = await axios.get('/api/groceries')
  return request.data
}

const create = async (newItem, config) => {
  const response = await axios.post('/api/groceries', newItem, config)
  return response.data
}

const updateGrocery = async (id, item, config) => {
  const response = await axios.put(`/api/groceries/${id}`, item, config)
  return response.data
}

const remove = async (id, config) => {
  const response = await axios.delete(`/api/groceries/${id}`, config)
  return response.data
}
export default { getAll, create, updateGrocery, remove }