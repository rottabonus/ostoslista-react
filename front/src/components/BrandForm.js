import React from 'react'

const BrandForm = ({ changeField, newName, borc, create }) => {
  return (
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
  )
}

export default BrandForm