import axios from 'axios'

const getAll = async () => {
  const request = await axios.get('/api/brands')
  return request.data
}

const create = async (newItem) => {
  const response = await axios.post('/api/brands', newItem)
  return response.data
}

const update = async (id, item) => {
  const response = await axios.put(`/api/brands/${id}`, item)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`/api/brands/${id}`)
  return response.data
}


export default { getAll, create, update, remove }