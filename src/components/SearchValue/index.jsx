import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

SearchValue.propTypes = {
    onSubmit: PropTypes.func,
};

function SearchValue(props) {
    const {onSubmit}= props;
    const [SearchValue, setSearchValue]= useState('');
    const typingSubmit= useRef(null);

    function handleFormChange(e){
        const value= e.target.value;
        setSearchValue(value);
        if (!onSubmit) return;
        if(typingSubmit.current){
            clearTimeout(typingSubmit.current);
        }

        typingSubmit.current= setTimeout(() =>{
            const formValue= {
                SearchValue :value
            }
            onSubmit(formValue);
        }, 300);
        
    }
    return (
        <div>
            <form onSubmit={handleFormChange}>
                <input type="text" 
                 className='form-control mb-2'
                 style={{width: '300px'}}
                 value={SearchValue}
                 onChange={handleFormChange}
                 placeholder='Mời bạn nhập...'/>
                </form>
        </div>
    );
}

export default SearchValue;