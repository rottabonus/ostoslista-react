import React from 'react'

const GroceryForm = ({ categories, category, create, newName, changeField, brands, brand, changeOption, amount, price }) => {

  return (
    <div>
      <form onSubmit={create}>
        <h2>groceryForm</h2>
        <div>
          <p>name<input type="text" name="newName" value={newName} onChange={changeField} /></p>
        </div>
        <div>
          <p>price<input type="text" name="price" value={price} onChange={changeField} /></p>
        </div>
        <div>
          <p>amount<input type="text" name="amount" value={amount} onChange={changeField} /></p>
        </div>
        <div>
          <select onChange={changeOption} name="category" value={category}>
            {categories.map(item =>
              <option key={item.cat_id} value={item.cat_id}>{item.name}</option>
            )}
          </select>
        </div>
        <div>
          <select onChange={changeOption} name="brand" value={brand}>
            {brands.map(item =>
              <option key={item.brand_id} value={item.brand_id}>{item.name}</option>
            )}
          </select>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default GroceryForm