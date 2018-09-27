import React from 'react'
import rappiRotta from '../images/rappiRotta.png'


const LoginForm = ({ username, changeField, password, login, toggle }) => {
	
	return (     
    <div className="container">
    <div className="listContainer">
    <div>
      <form onSubmit={login}>
        <div> username <input type="text" name="username" value={username} onChange={changeField}/></div>
        <div> password <input type="password" name="password" value={password} onChange={changeField}/></div>
        <button type="submit"> login </button>
      </form></div>
      <div><img src={rappiRotta} alt="rappiRotta" /></div>
      </div>
      <button onClick={(e) => toggle(e)}> switch to signup</button>   
      </div>
 )
}

export default LoginForm