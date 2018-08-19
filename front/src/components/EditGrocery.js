import React from 'react'

const EditGrocery = ({ maximize, changeField, categories, brands, save }) => {

  return (
    <div>
      <form onSubmit={save}>
        <h2>editForm</h2>
        <div>
          <p>name<input defaultValue={maximize.name} type="text" name="newName" onChange={changeField} /></p>
        </div>
        <div>
          <p>price<input defaultValue={maximize.price} type="text" name="price" onChange={changeField}/></p>
        </div>
        <div>
          <p>amount<input defaultValue={maximize.amount} type="text" name="amount" onChange={changeField}/></p>
        </div>
        <div>
          <select onChange={changeField} defaultValue={maximize.cat_id} name="category">
            {categories.map(item =>
              <option key={item.cat_id} value={item.cat_id}>{item.name}</option>
            )}
          </select>
        </div>
        <div>
          <select onChange={changeField} defaultValue={maximize.brand_id} name="brand">
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