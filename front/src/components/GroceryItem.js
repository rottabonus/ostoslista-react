import React from 'react'

const GroceryItem = (props) => {
  return (

    <div className="groceryItem">
      <h3>{props.name}</h3>
      <div>Price: {props.price} €</div>
      <div>Amount: {props.amount}</div>
    </div>
  )
}

export default GroceryItem
