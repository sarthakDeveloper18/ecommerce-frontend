import React, { useState } from 'react';

const RadioBox = ({prices, handleFilters}) => {

    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    }

    return prices.map((p, i)=>(
        <div key={i}>
            <input value={p._id} name={p} onChange={handleChange} type='radio' className='mr-2 mr-4'/>
            <label className='form-check-label'>{p.name}</label>
        </div>
    ))
}

export default RadioBox;