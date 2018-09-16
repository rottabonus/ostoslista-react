import React from 'react'

const LoginForm = ({ login, username, changeField, password }) => {
  return (
    <div>
      <h2> Login </h2>

      <form onSubmit={login}>
        <div> username
          <input
            type="text"
            name="username"
            value={username}
            onChange={changeField}
          />
        </div>
        <div>
            password
          <input
            type="password"
            name="password"
            value={password}
            onChange={changeField}
          />
        </div>
        <button type="submit"> login </button>
      </form>
    </div>
  )
}

export default LoginForm