import React from 'react'
import ListItem from './ListItem'

const Shoppinglist = ({ list, remove }) => {
	
	return (
	<div>
	<h2>This is finally the shoppinglist</h2>
	<form>
	{
		list.map(item => <ListItem item={item} remove={remove} key={item.or_id}></ListItem>)
	}
	</form>
	</div>
	)
}

export default Shoppinglist