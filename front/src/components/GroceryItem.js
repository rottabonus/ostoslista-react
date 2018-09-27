import React from 'react'
import { Link } from 'react-router-dom'

const GroceryItem = ({ add, item, show, toEdit, remove, quantity, change }) => {

    return (
      <tr onClick={() => show(item)}>
        <td>{item.name}</td>
        <td>{item.brand}</td>
        <td>{item.category}</td>
        <td>Price: {item.price} €</td>
        <td>Amount: {item.amount}</td>
        <td><input className="numberInput" onClick={(e) => e.stopPropagation()} onChange={change} name="quantity" min="0" type="number" /></td>
        <td onClick={(e) => add(e, item)}><button>add</button></td>
        <td onClick={(e) => toEdit(e, item)}><Link to={'/edit'}><button>edit</button></Link></td>
        <td onClick={(e) => remove(e, item)}><button>delete</button></td>
      </tr>
    )
}

export default GroceryItem
