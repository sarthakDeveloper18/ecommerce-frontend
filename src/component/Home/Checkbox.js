import React, { useState } from 'react';

const Checkbox = ({categories, handleFilters}) => {

    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c)
        }
        else{
            newCheckedCategoryId.splice(currentCategoryId)
        }
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }

    return categories.map((category, i)=>(
        <li key={i} className='list-unstyled'>
            <input onChange={handleToggle(category._id)} type='checkbox' className='form-check-input'/>
            <label className='form-check-label'>{category.name}</label>
        </li>
    ))
}

export default Checkbox;