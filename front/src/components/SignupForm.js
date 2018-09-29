import React from 'react'
import rappiKana from '../images/bird.png'

const SignupForm = ({ username, changeField, password, secret, signup, toggle }) => {

  return (
    <div className="container">
      <div className="listContainer">
        <div>
          <form onSubmit={signup}>
            <div> username <input type="text" name="username" value={username} onChange={changeField} /></div>
            <div> password <input type="password" name="password" value={password} onChange={changeField}/></div>
            <div> secret <input type="text" name="secret" value={secret} onChange={changeField}/></div>
            <button type="submit"> signup </button>
          </form></div>
        <div><img src={rappiKana} alt="rappiKana"/></div>
      </div>
      <button onClick={(e) => toggle(e)}>switch to login</button>
    </div>
  )
}

export default SignupForm