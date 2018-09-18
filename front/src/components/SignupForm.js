import React from 'react'


const SignupForm = ({ username, changeField, password, secret, signup, toggle }) => {
	
	return ( 
			<div>
      <form onSubmit={signup}> 
        <div> username <input type="text" name="username" value={username} onChange={changeField} /></div>
        <div> password <input type="password" name="password" value={password} onChange={changeField}/></div>
        <div> secret <input type="text" name="secret" value={secret} onChange={changeField}/></div>
        <button type="submit"> signup </button>
      </form>
       <button onClick={(e) => toggle(e)}>login</button>
      </div>
	)
}

export default SignupForm