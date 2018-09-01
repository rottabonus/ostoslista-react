import React from 'react'

const ListItem = ({ item, remove }) => {

  return (
    <tr className="shopItem">
      <td>{item.name}</td>
      <td>{item.brand}</td>
      <td>{item.category}</td>
      <td>{item.price} €</td>
      <td>{item.quantity}</td>
      <td><button onClick={(e) => remove(e, item)}>remove</button></td>
    </tr>
  )
}

export default ListItem