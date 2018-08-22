import React from 'react'
import { Link } from 'react-router-dom'
import Item from './Item'

const BrandsAndCategories = ({ brands, categories, changeField, borc, show, maximize, toEdit, remove }) => {
	
	if(borc === ''){
		return (
			<div>
			<h2>Brands and Categories</h2>
	<div><Link to="/cb">create brand or category</Link></div>
	<div><p>select to list</p></div>
	<div>
	<input onChange={changeField} type="radio" name="borc" value="categories"/><label>categories</label>
	<input onChange={changeField} type="radio" name="borc" value="brands"/><label>brands</label>
			</div></div>
			)
	} 
	return (
		<div>
	<div><h2>Brands and Categories</h2>
	<div><Link to="/cb">create brand or category</Link></div>
	</div>
	<div>
	<input onChange={changeField} type="radio" name="borc" value="categories"/><label>categories</label>
	<input onChange={changeField} type="radio" name="borc" value="brands"/><label>brands</label>
	
	{borc === 'categories' 
		? 
	categories.map(category => <Item toEdit={toEdit} maximize={maximize} item={category} show={show} key={category.cat_id} remove={remove}>{category.name}</Item>)
		: 
	brands.map(brand => <Item toEdit={toEdit} item={brand} maximize={maximize} show={show} key={brand.brand_id} remove={remove}>{brand.name}</Item>)}		
	</div>		
	</div>
	)
}

export default BrandsAndCategories