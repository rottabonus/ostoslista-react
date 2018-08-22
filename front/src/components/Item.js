import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({ item, show, maximize, toEdit }) => {

	if(maximize.name === item.name) {
		return (
			<div>
				<div onClick={() => show(item)}>{item.name}</div>
				<div onClick={(e) => toEdit(e)}><Link to={'/editb&c'}><button>edit</button></Link></div>
			</div>
			)
		} else {
			return (
				<div onClick={() => show(item)}>{item.name}</div>
				)
			}
		}

export default Item