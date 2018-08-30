import React from 'react'
import GroceryItem from './GroceryItem'
import { Link } from 'react-router-dom'

const GroceryDatabaseList = ({ groceries, maximize, show, filter, changeFilter, toEdit, remove, quantity, add }) => {

  const filtered = groceries.filter((grocery) =>
    grocery.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2> List of groceries available </h2>
      <div><Link to="/create">Create</Link></div>

      <p> Filter items <input type="text" name="filter" value={filter} onChange={changeFilter}/></p>
      <table>
        <tbody>
          {filtered.map(grocery =>
            <GroceryItem key={grocery.gr_id} change={changeFilter} show={show} item={grocery} maximize={maximize} add={add} toEdit={toEdit} remove={remove} quantity={quantity}> </GroceryItem>
          )}
        </tbody>
      </table>
    </div>
  )
}


export default GroceryDatabaseList
