import React from 'react'
import { Link } from 'react-router-dom'

const GroceryItem = ({ add, item, show, maximize, toEdit, remove, quantity, change }) => {

  if (item.gr_id === maximize.gr_id) {
    return (
      <tr onClick={() => show(maximize)}>
        <td>{maximize.name}</td>
        <td>{item.brand}</td>
        <td>{item.category}</td>
        <td>Price: {maximize.price} €</td>
        <td>Amount: {maximize.amount}</td>
        <td><input onClick={(e) => e.stopPropagation()} onChange={change} name="quantity" type="number" /></td>
        <td onClick={(e) => add(e, maximize)}><button>add to list</button></td>
        <td onClick={(e) => toEdit(e)}><Link to={'/edit'}><button>edit</button></Link></td>
        <td onClick={(e) => remove(e, maximize)}><button>delete</button></td>
      </tr>
    )
  } else {
    return (
      <tr onClick={() => show(item)}>
        <td>{item.name}</td>
        <td>{item.brand}</td>
        <td>{item.category}</td>
      </tr>
    )
  }
}

export default GroceryItem
