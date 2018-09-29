import React from 'react'
import GroceryItem from './GroceryItem'
import { Link } from 'react-router-dom'
import nainen from '../images/porkkananainen.png'

const GroceryDatabaseList = ({ groceries, show, filter, changeFilter, toEdit, remove, quantity, add }) => {

  const filtered = groceries.filter((grocery) =>
    grocery.name.toLowerCase().includes(filter.toLowerCase()) || grocery.brand.toLowerCase().includes(filter.toLowerCase()) || grocery.category.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2> List of groceries available </h2>
      <div><Link to="/create"><button>Create</button></Link></div>

      <p> Filter items <input type="text" name="filter" value={filter} onChange={changeFilter}/></p>
      <table>
        <thead>
          <tr className="tableHeaders">
            <th>name</th><th>brand</th><th>category</th><th>price</th><th>amount</th><th>quantity</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(grocery =>
            <GroceryItem key={grocery.gr_id} change={changeFilter} show={show} item={grocery} add={add} toEdit={toEdit} remove={remove} quantity={quantity}> </GroceryItem>
          )}
        </tbody>
      </table>
      <div><img src={nainen}/></div>
    </div>
  )
}


export default GroceryDatabaseList
