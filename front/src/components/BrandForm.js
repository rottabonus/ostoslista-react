import React from 'react'
import sieni from '../images/matatonsieni.png'

const BrandForm = ({ changeField, newName, borc, create }) => {
  return (
    <div className="listContainer">
    <div>
      <form onSubmit={create}>
        <h2>Form</h2>
        <p>name<input type="text" onChange={changeField} value={newName} name="newName"/></p>
        <select onChange={changeField} name="borc">
          <option value="" className="defaultOption">choose</option>
          <option value="brand">brand</option>
          <option value="category">category</option>
        </select>
		 <button type="submit">create</button>
      </form>
      </div>
      <div><img src={sieni} /></div>
    </div>
  )
}

export default BrandForm