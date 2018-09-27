import React from 'react'

const Notification = ({ message }) => {

  if (message === null) {
    return null
  }
  return(
    <div className="notification">
      <p className="notificationFont">{message}</p>
    </div>
  )
}

export default Notification