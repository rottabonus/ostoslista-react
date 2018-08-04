import React from 'react'
import './index.css'
import GroceryDatabaseList from './components/GroceryDatabaseList'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      groceries: [
        {
          name: 'banana',
          id: 1
        },
        {
          name: 'milk',
          id: 2
        },
        {
          name: 'yoghurt',
          id: 3
        }
      ]
    }
  }

  //<GroceryDatabaseList groceies={this.state.groceries} />

  onClick = () =>  {
    this.setState({ counter: this.state.counter + 1})
  }

  render() {
    return (
      <div className="container">
        <p>hello webpack {this.state.counter} clicks</p>
        <button onClick={this.onClick}>click</button>
        <GroceryDatabaseList groceries={this.state.groceries} />
      </div>
    )
  }
}

export default App
