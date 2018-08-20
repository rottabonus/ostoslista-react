import axios from 'axios'

const getAll = async () => {
  const request = await axios.get('http://localhost:3001/api/brands')
  return request.data
}

const create = async (newItem) => {
  const response = await axios.post('http://localhost:3001/api/brands', newItem)
  return response.data
}

export default { getAll, create }