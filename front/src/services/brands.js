import axios from 'axios'

const getAll = async () => {
  const request = await axios.get('/api/brands')
  return request.data
}

const create = async (newItem, config) => {
  const response = await axios.post('/api/brands', newItem, config)
  return response.data
}

const update = async (id, item, config) => {
  const response = await axios.put(`/api/brands/${id}`, item, config)
  return response.data
}

const remove = async (id, config) => {
  const response = await axios.delete(`/api/brands/${id}`, config)
  return response.data
}


export default { getAll, create, update, remove }