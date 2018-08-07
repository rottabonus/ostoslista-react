import React from 'react'

const GroceryItem = ({ item, show, maximize }) => {

  if (item.gr_id === maximize.gr_id) {
    return (
      <tr onClick={() => show(maximize)}>
        <td>{maximize.name}</td>
        <td>Price: {maximize.price} €</td>
        <td>Amount: {maximize.amount}</td>
        <td><button>edit</button></td>
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
