import React from 'react'
import GroceryItem from './GroceryItem'

const GroceryDatabaseList = ({ groceries, maximize, show, filter, changeFilter }) => {

  const filtered = groceries.filter((grocery) =>
    grocery.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1> List of groceries available </h1>

      <p> Filter items <input type="text" name="filter" value={filter} onChange={changeFilter}/></p>
      <table>
        <tbody>
          {filtered.map(grocery =>
            <GroceryItem key={grocery.gr_id} show={show} item={grocery} maximize={maximize}> </GroceryItem>
          )
          }
        </tbody>
      </table>
    </div>
  )
}


export default GroceryDatabaseList
