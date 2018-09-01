import React from 'react'

const EditBrand = ({ newName, changeField, update }) => {
  return (
    <div>
      <h2>Edit Brand or Category</h2>
      <form onSubmit={update}>
        <input type="text" name="newName" defaultValue={newName} onChange={changeField} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default EditBrand