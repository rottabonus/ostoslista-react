import React from 'react'

const EditGrocery = ({ changeField, categories, brands, save, newName, price, amount }) => {

  return (
    <div>
      <form onSubmit={save}>
        <h2>editForm</h2>
        <div>
          <p>name<input type="text" defaultValue={newName} name="newName" onChange={changeField} /></p>
        </div>
        <div>
          <p>price<input type="text" defaultValue={price} name="price" onChange={changeField}/></p>
        </div>
        <div>
          <p>amount<input type="text" defaultValue={amount} name="amount" onChange={changeField}/></p>
        </div>
        <div>
          <select onChange={changeField} name="category">
            {categories.map(item =>
              <option key={item.cat_id} value={item.cat_id}>{item.name}</option>
            )}
          </select>
        </div>
        <div>
          <select onChange={changeField} name="brand">
            {brands.map(item =>
              <option key={item.brand_id} value={item.brand_id}>{item.name}</option>
            )}
          </select>
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default EditGrocery