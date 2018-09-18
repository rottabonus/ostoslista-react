import axios from 'axios'

const login = async (credentials) => {
  const response = await axios.post('api/users/login', credentials)
  return response.data
}

const signup = async (credentials) => {
  const response = await axios.post('api/users/signup', credentials)
  return response.data
}

export default { login, signup }