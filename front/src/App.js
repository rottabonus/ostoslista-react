import React from 'react'
import './index.css'
import GroceryDatabaseList from './components/GroceryDatabaseList'
import About from './components/About'
import GroceryForm from './components/groceryForm'
import EditGrocery from './components/EditGrocery'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import groceryService from './services/groceries'
import categoryService from './services/categories'
import brandService from './services/brands'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      groceries: [],
        categories: [],
        brands: [],
        brand: '',
        category: '',
        price: '',
        amount: '',
        filter: '',
        maximize: '',
        newName: ''
    }
  }

  async componentDidMount() {
          const groceries = await groceryService.getAll()
            const categories = await categoryService.getAll()
                const brands = await brandService.getAll()
            this.setState({groceries, categories, brands})
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

  create = async (event) => {

      event.preventDefault()
      console.log('click!')
      const brand = parseInt(this.state.brand)
      const category = parseInt(this.state.category)
      const item = {
          name: this.state.newName,
          brand_id: brand,
          cat_id: category,
          price: this.state.price,
          amount: this.state.amount
      }
      await groceryService.create(item)
      const updatedGroceries = await groceryService.getAll()
      console.log('item:',item)
    this.setState({
        groceries: updatedGroceries,
        newName: '',
        amount: '',
        price: ''
    })
  }

  render() {
    return (
      <Router>
      <div>
      <div className="header">
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/">Groceries</Link></li>
          <li><Link to="/create">Create</Link></li>


      </ul>
      </div>
      <div className="container">
        <Route exact path="/" render={() => <GroceryDatabaseList show={this.show} maximize={this.state.maximize}
        groceries={this.state.groceries} changeFilter={this.handleFieldChange} filter={this.state.filter}/>}/>
         <Route path="/about" render={() => <About />}/>
         <Route path="/create" render={() => <GroceryForm newName={this.state.newName} changeField={this.handleFieldChange} create={this.create} brand={this.state.brand} price={this.state.price} amount={this.state.amount}
                                                          category={this.state.category} changeOption={this.handleFieldChange} categories={this.state.categories} brands={this.state.brands}/>}/>
          <Route path="/edit/" render={() => <EditGrocery maximize={this.state.maximize}/>}/>
      </div>
      </div>
      </Router>
    )
  }
}

export default App
