import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({ item, show, maximize, toEdit, remove }) => {

  if(maximize.name === item.name) {
    return (
      <tr>
        <td onClick={() => show(item)}>{item.name}</td>
        <td onClick={(e) => toEdit(e)}><Link to={'/editb&c'}><button>edit</button></Link></td>
        <td><button onClick={(e) => remove(e, item)}>remove</button></td>
      </tr>
    )
  } else {
    return (
      <tr>
      <td onClick={() => show(item)}>{item.name}</td>
      </tr>
    )
  }
}

export default Item