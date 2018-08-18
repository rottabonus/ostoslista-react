import React from 'react'
import { Link } from 'react-router-dom'

const GroceryItem = ({ item, show, maximize }) => {

  if (item.gr_id === maximize.gr_id) {
    return (
      <tr onClick={() => show(maximize)}>
        <td>{maximize.name}</td>
        <td>Price: {maximize.price} €</td>
        <td>Amount: {maximize.amount}</td>
        <td onClick={(e) => e.stopPropagation()}><Link to={`/edit`} onClick={(e) => e.stopPropagation()}><button  onClick={(e) => e.stopPropagation()}>edit</button></Link></td>
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
