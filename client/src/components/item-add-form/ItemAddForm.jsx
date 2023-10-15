import React, {useState} from 'react';
import "./item-add-form.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemAddForm = ({onItemAdded}) => {
    const [message, setMessage] = useState("");
    const onLabelChange = (events) => {
        setMessage(events.target.value)
    }

    const onSubmit = (events) => {
        events.preventDefault();
        onItemAdded(message);
        setMessage("");
    }

    return (
        <form className="item-add-form d-flex" onSubmit={onSubmit}>
            <input type="text"
                   className="search-panel form-control col-7 mr-3 "
                   value={message}
                   onChange={onLabelChange}
                   placeholder="Що хочете зробити?"/>
            <button type="button"
                    className="btn btn-success col-3"
                    onClick={onSubmit}>
                Add matter
            </button>
        </form>
    );
};

export default ItemAddForm;