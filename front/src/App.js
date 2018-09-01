import React from 'react'
import './index.css'
import GroceryDatabaseList from './components/GroceryDatabaseList'
import About from './components/About'
import GroceryForm from './components/groceryForm'
import EditGrocery from './components/EditGrocery'
import BrandsAndCategories from './components/BrandsAndCategories'
import BrandForm from './components/BrandForm'
import EditBrand from './components/EditBrand'
import Shoppinglist from './components/Shoppinglist'
import ListArchive from './components/ListArchive'
import { Router, Route, Link } from 'react-router-dom'
import groceryService from './services/groceries'
import categoryService from './services/categories'
import brandService from './services/brands'
import shopService from './services/shoppinglist'
import history from './history/history'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      groceries: [], categories: [], brands: [], brand: '', category: '', price: '', amount: '',
        filter: '', maximize: '', newName: '', borc: '', listItems: [], quantity: '',
        date: 'yyyy-mm-dd', history: [], listNum: '', oldList: []
    }
  }

  async componentDidMount() {
          const groceries = await groceryService.getAll()
            const categories = await categoryService.getAll()
                const brands = await brandService.getAll()
                  const listItems = await shopService.getAll()
                    const history = await shopService.getHistory()
            this.setState({ groceries, categories, brands, listItems, history })
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
      if(this.state.maximize.gr_id !== undefined) {
          this.setState({
          newName: this.state.maximize.name,
          price: this.state.maximize.price,
          amount: this.state.maximize.amount,
          brand: this.state.maximize.brand_id,
          category: this.state.maximize.cat_id
      })
    } else {
      this.setState({
        newName: this.state.maximize.name
      })
    }
  }

  create = async (event) => {
      event.preventDefault()
      console.log('create clicked!')
      const item = {
          name: this.state.newName,
          brand_id: parseInt(this.state.brand),
          cat_id: parseInt(this.state.category),
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

  createBrandOrCategory = async (event) => {
    event.preventDefault()
    console.log('createBrandOrCategory clicked!')
    const item = {
      name: this.state.newName
    }

    if(this.state.borc === "brand"){
      await brandService.create(item)
      const updatedBrands = await brandService.getAll()
      this.setState({
        brands: updatedBrands,
        newName: ''
      })
      history.push('/b&c')
    }
    else if (this.state.borc === 'category'){
      console.log('creating new category')
      await categoryService.create(item)
      const updatedCategories = await categoryService.getAll()
      this.setState({
        categories: updatedCategories,
        newName: ''
      })
      history.push('/b&c')
    } else {
      alert('choose category or brand!')
    }
  }

  update = async (event) => {
      event.preventDefault()
      console.log('update clicked!')
      if (this.state.brand === undefined || this.state.category === undefined) {
          console.log('cat or brand null')
      } else {
          const id = this.state.maximize.gr_id
          const updateItem = {
              name: this.state.newName,
              brand_id: parseInt(this.state.brand),
              cat_id: parseInt(this.state.category),
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
  }

  updateBrandOrCategory = async (event) => {
    event.preventDefault()
    console.log('updateBrandOrCategory clicked!')
    if(this.state.borc === 'brands') {
      console.log('brands!')
      const id = this.state.maximize.brand_id
      const item = {
        name: this.state.newName
      }
      await brandService.update(id, item)
      console.log('id', id, 'name', item)
      const updatedBrands = await brandService.getAll()
      this.setState({
        brands: updatedBrands,
        newName: '',
        maximize: ''
      })
      history.push('/b&c')
    }
    else {
      console.log('categories!')
      const id = this.state.maximize.cat_id
      const item = {
        name: this.state.newName
      }
      await categoryService.update(id, item)
      const updatedCategories = await categoryService.getAll()
      this.setState({
        categories: updatedCategories,
        newName: '',
        maximize: ''
      })
      history.push('/b&c')
    }
  }

  delete = async (event, maximized) => {
      event.stopPropagation()
      console.log('delete clicked!, to delete', maximized.name)
      const id = maximized.gr_id
      const groceries = this.state.groceries
      await groceryService.remove(id)
      this.setState({
          groceries: groceries.filter(g => g.gr_id !== id),
          maximize: ''
      })
  }

  deleteBrandOrCategory = async (event, maximized) => {
    event.stopPropagation()
    console.log('deleteBrandOrCategory clicked! to delete:', maximized.name)
    if(this.state.borc === 'brands'){
      const id = maximized.brand_id
      await brandService.remove(id)
      const updatedBrands = await brandService.getAll()
      this.setState({
        brands: updatedBrands,
        maximize: ''
      })
    } else {
      const id = maximized.cat_id
      await categoryService.remove(id)
      const updatedCategories = await categoryService.getAll()
      this.setState({
        categories: updatedCategories,
        maximize: ''
      })
    }
  }

  addToList = async (event, maximized) => {
    event.stopPropagation()
    console.log('clicked addToList', maximized.name)
    const quantity = parseInt(this.state.quantity)
    const newListItem = {
      quantity,
      gr_id: maximized.gr_id
    }
    console.log(newListItem)
    await shopService.add(newListItem)
    const updatedShoppinglist = await shopService.getAll()
    this.setState({
      listItems: updatedShoppinglist,
      maximize: '',
      quantity: ''
    })
  }

  removeFromList = async (event, item) => {
    event.preventDefault()
    console.log('removeFromList clicked', item)
      const id = item.or_id
      await shopService.remove(id)
      const updatedListItems = await shopService.getAll()
      this.setState({
          listItems: updatedListItems
      })
  }

  resolve = async (event) => {
      event.preventDefault()
      if(window.confirm('Are you sure you want to resolve the shoppinglist?')){
          console.log('resolve submitted')
          const resolver = {}
          await shopService.resolveList(resolver)
          this.setState({
              listItems: []
          })
      }
  }

  newShoppingList = async (event) => {
      event.preventDefault()
      console.log('new shoppingList!')
      const reg = /(\d{4}-\d{2}-\d{2})/
      const matches = this.state.date.match(reg)
      console.log(matches)
      if(matches === null){
          window.confirm('did not match pattern yyyy-mm-dd')
      } else {
          const newItem = { date: this.state.date,
                        resolved: 'N'}
          await shopService.newlist(newItem)
          this.setState({
              listItems: []
          })
          history.push('/')
      }
  }

  getOldList = async (event, id) => {
      event.preventDefault()
      console.log('pushed archiveItem', id)
      const oldList = await shopService.getOne(id)
      if (this.state.oldList.length === 0){
          this.setState({ oldList })
      } else {
          this.setState({oldList: []})
      }
  }

  render() {
    return (
      <Router history={history}>
      <div>
      <div className="header">   
        <div><Link to="/about">About</Link></div>
        <div><Link to="/shoppinglist">Shoppinglist</Link></div>
        <div><Link to="/">Groceries</Link></div>
          <div><Link to="/b&c">Brands&Categories</Link></div>
          <div><Link to="/archive">Archive</Link></div>
      </div>

      <div className="container">
        <Route exact path="/" render={() => <GroceryDatabaseList show={this.show} maximize={this.state.maximize} toEdit={this.toEdit} remove={this.delete} add={this.addToList}
                                              groceries={this.state.groceries} changeFilter={this.handleFieldChange} filter={this.state.filter} quantity={this.state.quatity}/>}/>
         <Route path="/about" render={() => <About />}/>
         <Route path="/create" render={() => <GroceryForm changeField={this.handleFieldChange} create={this.create}
                                              categories={this.state.categories} brands={this.state.brands}/>}/>
          <Route path="/edit" render={() => <EditGrocery maximize={this.state.maximize} categories={this.state.categories} save={this.update}
                                              brands={this.state.brands} changeField={this.handleFieldChange} />}/>
          <Route path="/b&c" render={() => <BrandsAndCategories brands={this.state.brands} categories={this.state.categories} changeField={this.handleFieldChange} borc={this.state.borc} show={this.show}
                                              toEdit={this.toEdit} maximize={this.state.maximize} remove={this.deleteBrandOrCategory}/>}/>
          <Route path="/cb" render={() => <BrandForm create={this.createBrandOrCategory} changeField={this.handleFieldChange} newName={this.state.newName} borc={this.state.borc}/>}/>
          <Route path="/editb&c" render={() => <EditBrand update={this.updateBrandOrCategory} newName={this.state.newName} changeField={this.handleFieldChange} />}/>
          <Route path="/shoppinglist" render={() => <Shoppinglist history={this.state.history} list={this.state.listItems} remove={this.removeFromList} resolve={this.resolve} newList={this.newShoppingList} changeField={this.handleFieldChange}/>}/>
          <Route path="/archive" render={() => <ListArchive history={this.state.history} getOld={this.getOldList} old={this.state.oldList}/>}/>
      </div>
      </div>
      </Router>
    )
  }
}

export default App
