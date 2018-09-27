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
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Notification from './components/Notification'
import { Router, Route, Link } from 'react-router-dom'
import groceryService from './services/groceries'
import categoryService from './services/categories'
import brandService from './services/brands'
import shopService from './services/shoppinglist'
import loginService from './services/users'
import history from './history/history'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      groceries: [], categories: [], brands: [], brand: '', category: '', price: '', amount: '', error: null,
        filter: '', maximize: '', newName: '', borc: '', listItems: [], quantity: '', secret: '', list: false,
        date: 'yyyy-mm-dd', history: [], oldList: [], user: null, password: '', username: '', toggle: false
    }
  }

  async componentDidMount() {
          const groceries = await groceryService.getAll()
            const categories = await categoryService.getAll()
                const brands = await brandService.getAll()
                  const listItems = await shopService.getAll()
                    const history = await shopService.getHistory()
                    if(history.filter(list => list.resolved !== 'Y').length !== 0){
                      this.setState({ groceries, categories, brands, listItems, history, list:true })
                    } else {
                      this.setState({ groceries, categories, brands, listItems, history })
                    }        
  }

  handleFieldChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
      event.preventDefault()
      console.log('login clicked!')
      const credentials = {
          username: this.state.username,
          password: this.state.password
      }
      const user = await loginService.login(credentials)
      this.setState({ user })
      console.log(user.token)
  }

  signup = async (event) => {
    event.preventDefault()
    console.log('signup clicked!')
    const newUser = {
      username: this.state.username,
      password: this.state.password,
      secret: this.state.secret
    }
      try {
          await loginService.signup(newUser)
          this.setState({username: '', password: '', secret: '', toggle: false})
      } catch (e) {
        console.log(e, "wrong secret m8")
      }
  }

  show = (item) => {
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

  toEdit = (event, item) => {
      event.stopPropagation()
          this.setState({
          newName: item.name,
          price: item.price,
          amount: item.amount,
          brand: item.brand_id,
          category: item.cat_id
      })
    }

  create = async (event) => {
      event.preventDefault()
      const item = {
          name: this.state.newName,
          brand_id: parseInt(this.state.brand),
          cat_id: parseInt(this.state.category),
          price: this.state.price,
          amount: this.state.amount
      }
      const config = {
          headers: {'Authorization': "bearer " + this.state.user.token}
      }
      await groceryService.create(item, config)
      const updatedGroceries = await groceryService.getAll()
    this.setState({
        groceries: updatedGroceries,
        newName: '',
        amount: '',
        price: '',
        error: `${item.name} created and added to groceries`
    })
      history.push('/')
      setTimeout(() => {
          this.setState({ error: null })
      }, 5000)
  }

  createBrandOrCategory = async (event) => {
    event.preventDefault()
      const config = {
          headers: {'Authorization': "bearer " + this.state.user.token}
      }
    const item = {
      name: this.state.newName
    }

    if(this.state.borc === "brand"){
      await brandService.create(item, config)
      const updatedBrands = await brandService.getAll()
      this.setState({
        brands: updatedBrands,
        newName: '',
          error: `${item.name} created and added to brands`
      })
      history.push('/b&c')
    }
    else if (this.state.borc === 'category'){
      await categoryService.create(item, config)
      const updatedCategories = await categoryService.getAll()
      this.setState({
        categories: updatedCategories,
        newName: '',
          error: `${item.name} created and added to categories`
      })
      history.push('/b&c')
    } else {
      alert('choose category or brand!')
    }
    setTimeout(() => {
        this.setState({ error: null })
    }, 5000)
  }

  update = async (event) => {
      event.preventDefault()
      if (this.state.brand === undefined || this.state.category === undefined) {
          this.setState({ error: 'Change category and brand!!'})
      } else {
          const id = this.state.maximize.gr_id
          const updateItem = {
              name: this.state.newName,
              brand_id: parseInt(this.state.brand),
              cat_id: parseInt(this.state.category),
              price: this.state.price,
              amount: this.state.amount,
          }
          const config = {
              headers: {'Authorization': "bearer " + this.state.user.token}
          }
          await groceryService.updateGrocery(id, updateItem, config)
          const updatedGroceries = await groceryService.getAll()
          this.setState({
              groceries: updatedGroceries,
              newName: '',
              amount: '',
              price: '',
              maximize: '',
              error: `${updateItem.name} was updated`
          })
          history.push('/')
          setTimeout(() => {
              this.setState({ error: null })
          }, 5000)
      }
  }

  updateBrandOrCategory = async (event) => {
    event.preventDefault()
      const config = {
          headers: {'Authorization': "bearer " + this.state.user.token}
      }
    if(this.state.borc === 'brands') {
      console.log('brands!')
      const id = this.state.maximize.brand_id
      const item = {
        name: this.state.newName
      }
      await brandService.update(id, item, config)
      const updatedBrands = await brandService.getAll()
      this.setState({
        brands: updatedBrands,
        newName: '',
        maximize: '',
          error: `${item.name} updated`
      })
      history.push('/b&c')
    }
    else {
      console.log('categories!')
      const id = this.state.maximize.cat_id
      const item = {
        name: this.state.newName
      }
      await categoryService.update(id, item, config)
      const updatedCategories = await categoryService.getAll()
      this.setState({
        categories: updatedCategories,
        newName: '',
        maximize: '',
          error: `${item.name} updated`
      })
      history.push('/b&c')
    }
    setTimeout(() => {
        this.setState({ error: null })
    }, 5000)
  }

  delete = async (event, maximized) => {
      event.stopPropagation()
      const id = maximized.gr_id
      const groceries = this.state.groceries
      const config = {
          headers: {'Authorization': "bearer " + this.state.user.token}
      }
      await groceryService.remove(id, config)
      this.setState({
          groceries: groceries.filter(g => g.gr_id !== id),
          maximize: '',
          error: `${maximized.name} deleted`
      })
      setTimeOut(() => {
          this.setState({ error: null })
      }, 5000)
  }

  deleteBrandOrCategory = async (event, maximized) => {
    event.stopPropagation()
      const config = {
          headers: {'Authorization': "bearer " + this.state.user.token}
      }
    if(this.state.borc === 'brands'){
      const id = maximized.brand_id
      await brandService.remove(id, config)
      const updatedBrands = await brandService.getAll()
      this.setState({
        brands: updatedBrands,
        maximize: '',
          error: `${maximized.name} deleted`
      })
    } else {
      const id = maximized.cat_id
      await categoryService.remove(id, config)
      const updatedCategories = await categoryService.getAll()
      this.setState({
        categories: updatedCategories,
        maximize: '',
          error: `${maximized.name} deleted`
      })
    }
    setTimeout(() => {
        this.setState({ error: null })
    }, 5000)
  }

  addToList = async (event, maximized) => {
    event.stopPropagation()
      const config = {
          headers: {'Authorization': "bearer " + this.state.user.token}
      }
    const quantity = parseInt(this.state.quantity)
      if(quantity <= 0 || isNaN(quantity)){
            this.setState({error: 'must have quantity before adding to list!'})
      } else if (!this.state.list) {
            this.setState({error: 'create a new list before adding items!'})
      } else {
          const newListItem = {
              quantity,
              gr_id: maximized.gr_id
          }
          await shopService.add(newListItem, config)
          const updatedShoppinglist = await shopService.getAll()
          this.setState({
              listItems: updatedShoppinglist,
              maximize: '',
              quantity: '',
              error: `${maximized.name} added to list`
          })
        }
          setTimeout(() => {
              this.setState({ error: null })
          }, 5000)    
  }

  removeFromList = async (event, item) => {
    event.preventDefault()
      const config = {
          headers: {'Authorization': "bearer " + this.state.user.token}
      }
      const id = item.or_id
      await shopService.remove(id, config)
      const updatedListItems = await shopService.getAll()
      this.setState({
          listItems: updatedListItems,
          error: `${item.name} removed from list`
      })
      setTimeout(() => {
          this.setState({ error: null })
      }, 5000 )
  }

  resolve = async (event) => {
      event.preventDefault()
      const config = {
          headers: {'Authorization': "bearer " + this.state.user.token}
      }
      if(window.confirm('Are you sure you want to resolve the shoppinglist?')){
          const resolver = {}
          await shopService.resolveList(resolver, config)
          const history = await shopService.getHistory()
          this.setState({
              listItems: [],
              history,
              error: `shoppinglist was resolved!`
          })
          setTimeout(() => {
              this.setState({ error: null })
          }, 5000)
      }
  }

  newShoppingList = async (event) => {
      event.preventDefault()
      const config = {
          headers: {'Authorization': "bearer " + this.state.user.token}
      }
      const reg = /(\d{4}-\d{2}-\d{2})/
      const matches = this.state.date.match(reg)
      console.log(matches)
      if(matches === null){
          this.setState({ error: 'did not match pattern yyyy-mm-dd' })
      } else {
          const newItem = { date: this.state.date,
                        resolved: 'N'}
          await shopService.newlist(newItem, config)
          const history = await shopService.getHistory()
          this.setState({
              listItems: [],
              history,
              error: 'new shoppinglist created'
          })
          history.push('/')
      }
      setTimeout(() => {
              this.setState({ error: null })
          }, 5000)
  }

  getOldList = async (event, id) => {
      event.preventDefault()
      const oldList = await shopService.getOne(id)
      if (this.state.oldList.length === 0){
          this.setState({ oldList })
      } else {
          this.setState({oldList: []})
      }
  }

  toggleLogin = (event) => {
    event.preventDefault()
    console.log('logintoggle')
    this.setState({toggle: !this.state.toggle })
  }

  render() {
    return (
        <Router history={history}>
        { !this.state.user ? (!this.state.toggle ? <div><LoginForm toggle={this.toggleLogin} password={this.state.password} username={this.state.username} changeField={this.handleFieldChange} login={this.login}/></div> :
          <div><SignupForm toggle={this.toggleLogin} password={this.state.password} username={this.state.username} changeField={this.handleFieldChange} secret={this.state.secret} signup={this.signup}/></div>) :

              <div>
                  <div className="header">
                      <div><Link to="/about">About</Link></div>
                      <div><Link to="/shoppinglist">Shoppinglist</Link></div>
                      <div><Link to="/">Groceries</Link></div>
                      <div><Link to="/b&c">Brands&Categories</Link></div>
                      <div><Link to="/archive">Archive</Link></div>
                      <div><a onClick={()=> this.setState({user: null})}>Logout</a></div>
                  </div>

                  <div className="container">
                      <div>
                          <Route exact path="/" render={() => <GroceryDatabaseList show={this.show} maximize={this.state.maximize} toEdit={this.toEdit} remove={this.delete} add={this.addToList} groceries={this.state.groceries} changeFilter={this.handleFieldChange} filter={this.state.filter} quantity={this.state.quantity}/>}/>
                          <Route path="/about" render={() => <About/>}/>
                          <Route path="/create" render={() => <GroceryForm changeField={this.handleFieldChange} create={this.create} categories={this.state.categories} brands={this.state.brands}/>}/>
                          <Route path="/edit" render={() => <EditGrocery newName={this.state.newName} categories={this.state.categories} save={this.update} brands={this.state.brands} price={this.state.price} amount={this.state.amount} changeField={this.handleFieldChange}/>}/>
                          <Route path="/b&c" render={() => <BrandsAndCategories brands={this.state.brands} categories={this.state.categories} changeField={this.handleFieldChange} borc={this.state.borc} show={this.show} toEdit={this.toEdit} maximize={this.state.maximize} remove={this.deleteBrandOrCategory}/>}/>
                          <Route path="/cb" render={() => <BrandForm create={this.createBrandOrCategory} changeField={this.handleFieldChange} newName={this.state.newName} borc={this.state.borc}/>}/>
                          <Route path="/editb&c" render={() => <EditBrand update={this.updateBrandOrCategory} newName={this.state.newName} changeField={this.handleFieldChange}/>}/>
                          <Route path="/shoppinglist" render={() => <Shoppinglist history={this.state.history} list={this.state.listItems} remove={this.removeFromList} resolve={this.resolve} newList={this.newShoppingList} changeField={this.handleFieldChange}/>}/>
                          <Route path="/archive" render={() => <ListArchive history={this.state.history} getOld={this.getOldList} old={this.state.oldList}/>}/></div>
                      <Notification message={this.state.error}/>
                  </div>
              </div>
  }
        </Router>
    )
  }
}

export default App