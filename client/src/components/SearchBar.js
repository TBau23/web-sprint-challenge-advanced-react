import React from 'react';

const SearchBar = props => {

    return(
        <div>
            <input 
            type = 'search'
            placeholder='search for plants by name'
            onChange={props.searchChange}
            />
        </div>
    )
}

export default SearchBar