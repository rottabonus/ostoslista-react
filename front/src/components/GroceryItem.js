import React from 'react'
import { Link } from 'react-router-dom'

const GroceryItem = ({ item, show, maximize, toEdit, remove }) => {

  if (item.gr_id === maximize.gr_id) {
    return (
      <tr onClick={() => show(maximize)}>
        <td>{maximize.name}</td>
        <td>Price: {maximize.price} €</td>
        <td>Amount: {maximize.amount}</td>
        <td onClick={(e) => toEdit(e)}><Link to={'/edit'}><button>edit</button></Link></td>
        <td onClick={(e) => remove(e, maximize)}><button>delete</button></td>
      </tr>
    )
  } else {
    return (
      <tr onClick={() => show(item)}>
        <td>{item.name}</td>
      </tr>
    )
  }
}

export default GroceryItem
