import React from 'react'
import './index.css'
import GroceryDatabaseList from './components/GroceryDatabaseList'
import About from './components/About'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      groceries: [],
        filter: '',
        maximize: ''
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

  show = (item) => {
      console.log(item)
      if(this.state.maximize !== '') {
          this.setState({
              maximize: ''
          })
      } else {
          this.setState({
              maximize: item
          })
      }
  }

  render() {
    return (
      <Router>
      <div>
      <div className="header">
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/groceries">Groceries</Link></li>
      </ul>
      </div>
      <div className="container">
        <p>hello webpack {this.state.counter} clicks</p>
        <button onClick={this.onClick}>click</button>
        <Route path="/groceries" render={() => <GroceryDatabaseList show={this.show} maximize={this.state.maximize}
        groceries={this.state.groceries} changeFilter={this.handleFieldChange} filter={this.state.filter}/>}/>
         <Route path="/about" render={() => <About />}/>                   
      </div>
      </div>
      </Router>
    )
  }
}

export default App
