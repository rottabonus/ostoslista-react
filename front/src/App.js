import React from 'react'
import './index.css'
import GroceryDatabaseList from './components/GroceryDatabaseList'
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      groceries: [],
        filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/api/groceries')
      .then(response => {
        const groceries = response.data
        console.log(groceries)
      this.setState({groceries})
      })
  }

  onClick = () =>  {
    this.setState({ counter: this.state.counter + 1})
  }

  handleFieldChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className="container">
        <p>hello webpack {this.state.counter} clicks</p>
        <button onClick={this.onClick}>click</button>
        <GroceryDatabaseList groceries={this.state.groceries} changeFilter={this.handleFieldChange} filter={this.state.filter}/>
      </div>
    )
  }
}

export default App
