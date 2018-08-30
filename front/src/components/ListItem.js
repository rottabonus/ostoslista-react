import React from 'react'

const ListItem = ({ item, remove }) => {
	
	return (
		<div className="shopItem">
		<div>{item.name}</div>
		<div><button onClick={(e) => remove(e, item)}>remove</button></div>
		</div>
	)
}

export default ListItem