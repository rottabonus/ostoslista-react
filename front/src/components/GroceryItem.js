import React from 'react'
import { Link } from 'react-router-dom'

const GroceryItem = ({ item, show, maximize }) => {

  if (item.gr_id === maximize.gr_id) {
    return (
      <tr onClick={() => show(maximize)}>
        <td>{maximize.name}</td>
        <td>Price: {maximize.price} €</td>
        <td>Amount: {maximize.amount}</td>
        <td><button onClick={(e) => e.stopPropagation()}><Link to={`groceries/${maximize.gr_id}`}>edit</Link></button></td>
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
