import React from 'react';

export default ({ type,input, label, meta: {error, touched }}) =>{

    return (
        <div >
            <label>{label} </label>
            <input {...input} 
            type={ type }
            className="form-control"/>
            <div className="error">
                {touched && error}
            </div>
            
        </div>
        //{touched && error} if touched is false the enteriment state won't be executed
        // if touched ==true it will return the error string
    )
}