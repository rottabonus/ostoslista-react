import React from 'react'
import ListItem from './ListItem'

const Shoppinglist = ({ list, remove,  resolve, newList, changeField, history }) => {

  const isResolved = history.filter(list => list.resolved !== 'Y')

  const priceOfRows = list.map(row => row.quantity * parseFloat(row.price.replace(',', '.')))
  const estimatedPrice = priceOfRows.reduce((acc, curr) => {
    return acc + curr
  }, 0)

  return (
    <div>
      <h2>Shoppinglist</h2>
      {
        { isResolved } === 0 ?
          <form onSubmit={newList}>
            <h3>create new</h3>
            <p>date<input type="text" onChange={changeField} name="date" defaultValue="yyyy-mm-dd"/></p>
			  <button type="submit">create</button>
          </form>
          :
          <form onSubmit={resolve}>
            <table>
              <tbody>
                {
                  list.map(item => <ListItem item={item} remove={remove} key={item.or_id}></ListItem>)
                }
                <tr><td><p>estimated price {estimatedPrice} €</p></td></tr>
                <tr><td><button type="submit">resolve</button></td></tr>
              </tbody>
            </table>
          </form>
      }
    </div>
  )
}

export default Shoppinglist