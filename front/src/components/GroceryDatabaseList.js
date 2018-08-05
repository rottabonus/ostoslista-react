import React from 'react'
import GroceryItem from './GroceryItem'

class GroceryDatabaseList extends React.Component {
  constructor(props){
    super(props)
  }

  render() {

    const filtered = this.props.groceries.filter((grocery) =>
      grocery.name.toLowerCase().includes(this.props.filter.toLowerCase()))

    return (
      <div>
        <h1> List of groceries available </h1>

        <p> Filter items <input type="text" name="filter" value={this.props.filter} onChange={this.props.changeFilter}/></p>
        {filtered.map(grocery =>
          <div key={grocery.gr_id}>
            <GroceryItem name={grocery.name} price={grocery.price} amount={grocery.amount}> </GroceryItem>
          </div>
        )
        }
      </div>
    )
  }
}

export default GroceryDatabaseList
