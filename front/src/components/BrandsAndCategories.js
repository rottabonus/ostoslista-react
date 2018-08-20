import React from 'react'
import { Link } from 'react-router-dom'
import CategoryItem from './CategoryItem'

const BrandsAndCategories = ({ brands, categories, changeField, borc }) => {
	
	return (
		<div>
	<div>
	<h2>Brands and Categories</h2>
	<div><Link to="/cb">create brand or category</Link></div>
	</div>
	<div>
	<input onChange={changeField} type="radio" name="borc" value="categories"/><label>categories</label>
	<input onChange={changeField} type="radio" name="borc" value="brands"/><label>brands</label>

	{borc === 'categories' ? 
	categories.map(category => <CategoryItem category={category} key={category.cat_id}>{category.name}</CategoryItem>)
		: 
	brands.map(brand => <div key={brand.brand_id}>{brand.name}</div>)}		
	</div>		
	</div>
	)
}

export default BrandsAndCategories