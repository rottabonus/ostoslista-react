import React from 'react'

class GroceryDatabaseList extends React.Component {
constructor(props){
  super(props)
}

  render() {
    return (
      <div>
      <h2> List of groceries available </h2>
      {this.props.groceries.map(grocery =>
      <div key={grocery.id}>
      <div>{grocery.name}</div>
      </div>
      )
      }
      </div>
    )
  }
}

export default GroceryDatabaseList
