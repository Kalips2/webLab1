import React, {useEffect, useState} from 'react';
import "./search-panel.css"

const SearchPanel = ({term, handleTermChange}) => {

    return (
        <>
            <input type="text"
                   className="search-panel form-control col-7 mr-3"
                   placeholder="Введіть для пошуку"
                   value={term}
                   onChange={handleTermChange}/>
        </>
    );
};

export default SearchPanel;