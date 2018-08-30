import axios from 'axios'

const getAll = async () => {
  const request = await axios.get('http://localhost:3001/api/shoppinglist')
  return request.data
}

const add = async (newItem) => {
	const request = await axios.post('http://localhost:3001/api/shoppinglist', newItem)
}

const updateAmount = async (id, item) => {
  const response = await axios.put(`http://localhost:3001/api/shoppinglist/${id}`, item)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`http://localhost:3001/api/shoppinglist/${id}`)
  return response.data
}

export default { getAll, add, updateAmount, remove }