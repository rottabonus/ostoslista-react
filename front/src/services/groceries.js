import axios from 'axios'

const getAll = async () => {
  const request = await axios.get('/api/groceries')
  return request.data
}

const create = async (newItem) => {
  const response = await axios.post('/api/groceries', newItem)
  return response.data
}

const updateGrocery = async (id, item) => {
  const response = await axios.put(`/api/groceries/${id}`, item)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`/api/groceries/${id}`)
  return response.data
}
export default { getAll, create, updateGrocery, remove }