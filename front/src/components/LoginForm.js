import React from 'react'


const LoginForm = ({ username, changeField, password, login, toggle }) => {
	
	return (     
    <div>
      <form onSubmit={login}>
        <div> username <input type="text" name="username" value={username} onChange={changeField}/></div>
        <div> password <input type="password" name="password" value={password} onChange={changeField}/></div>
        <button type="submit"> login </button>
      </form>
      <button onClick={(e) => toggle(e)}>signup</button>   
      </div>
 )
}

export default LoginForm