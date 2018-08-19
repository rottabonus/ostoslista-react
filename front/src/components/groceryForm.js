import React from 'react'

const GroceryForm = ({ categories, create, changeField, brands }) => {

  return (
    <div>
      <form onSubmit={create}>
        <h2>groceryForm</h2>
        <div>
          <p>name<input type="text" name="newName"  onChange={changeField} /></p>
        </div>
        <div>
          <p>price<input type="text" name="price" onChange={changeField} /></p>
        </div>
        <div>
          <p>amount<input type="text" name="amount" onChange={changeField} /></p>
        </div>
        <div>
          <select onChange={changeField} defaultValue="choose" name="category">
            <option className="defaultOption" value="">choose</option>
            {categories.map(item =>
              <option key={item.cat_id} value={item.cat_id}>{item.name}</option>
            )}
          </select>
        </div>
        <div>
          <select onChange={changeField} name="brand">
            <option className="defaultOption" value="">choose</option>
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