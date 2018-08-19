import React from 'react'
import './index.css'
import GroceryDatabaseList from './components/GroceryDatabaseList'
import About from './components/About'
import GroceryForm from './components/groceryForm'
import EditGrocery from './components/EditGrocery'
import { Router, Route, Link } from 'react-router-dom'
import groceryService from './services/groceries'
import categoryService from './services/categories'
import brandService from './services/brands'
import history from './history/history'

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

  toEdit = (event) => {
      event.stopPropagation()
      this.setState({
          newName: this.state.maximize.name,
          price: this.state.maximize.price,
          amount: this.state.maximize.amount,
          brand: this.state.maximize.brand_id,
          category: this.state.maximize.cat_id
      })
  }

  create = async (event) => {
      event.preventDefault()
      console.log('create clicked!')
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
      history.push('/')
  }

  update = async (event) => {
      event.preventDefault()
      console.log('update clicked!')
      const brand = parseInt(this.state.brand)
      const category = parseInt(this.state.category)
      const id = this.state.maximize.gr_id
      const updateItem = {
          name: this.state.newName,
          brand_id: brand,
          cat_id: category,
          price: this.state.price,
          amount: this.state.amount
      }
      await groceryService.updateGrocery(id, updateItem)
      const updatedGroceries = await groceryService.getAll()
      this.setState({
          groceries: updatedGroceries,
          newName: '',
          amount: '',
          price: '',
          maximize: ''
      })
      history.push('/')
  }

  delete = async (event, maximized) => {
      event.stopPropagation()
      console.log('delete clicked!, to delete', maximized.name)
      const id = maximized.gr_id
      const groceries = this.state.groceries
      await groceryService.remove(id)
      this.setState({
          groceries: groceries.filter(g => g.gr_id !== id),
          maximized: ''
      })
  }

  render() {
    return (
      <Router history={history}>
      <div>
      <div className="header">
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/">Groceries</Link></li>
          <li><Link to="/create">Create</Link></li>

      </ul>
      </div>
      <div className="container">
        <Route exact path="/" render={() => <GroceryDatabaseList show={this.show} maximize={this.state.maximize} toEdit={this.toEdit} remove={this.delete}
                                                                 groceries={this.state.groceries} changeFilter={this.handleFieldChange} filter={this.state.filter}/>}/>
         <Route path="/about" render={() => <About />}/>
         <Route path="/create" render={() => <GroceryForm changeField={this.handleFieldChange} create={this.create}
                                                          categories={this.state.categories} brands={this.state.brands}/>}/>
          <Route path="/edit" render={() => <EditGrocery maximize={this.state.maximize} categories={this.state.categories} save={this.update}
                                                                    brands={this.state.brands} changeField={this.handleFieldChange} />}/>
      </div>
      </div>
      </Router>
    )
  }
}

export default App
