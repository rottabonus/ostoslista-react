import axios from 'axios'

const getAll = async () => {
  const request = await axios.get('http://localhost:3001/api/brands')
  return request.data
}

export default { getAll }