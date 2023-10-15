import React, {useState} from 'react';
import "./search-panel.css"

const SearchPanel = ({onSearchChange}) => {
    const [term, setTerm] = useState('');

    const onSearch = (events) => {
        const term = events.target.value;
        setTerm(term);
        onSearchChange(term);
    }
    return (
        <>
            <input type="text"
                   className="search-panel form-control col-7 mr-3"
                   placeholder="Введіть для пошуку"
                   value={term}
                   onChange={onSearch}/>
        </>
    );
};

export default SearchPanel;