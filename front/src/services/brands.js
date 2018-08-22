import axios from 'axios'

const getAll = async () => {
  const request = await axios.get('http://localhost:3001/api/brands')
  return request.data
}

const create = async (newItem) => {
  const response = await axios.post('http://localhost:3001/api/brands', newItem)
  return response.data
}

const update = async (id, item) => {
  const response = await axios.put(`http://localhost:3001/api/brands/${id}`, item)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`http://localhost:3001/api/brands/${id}`)
  return response.data
}


export default { getAll, create, update, remove }