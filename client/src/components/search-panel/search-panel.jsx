import "./search-panel.css"
import {useEffect, useState} from "react";

const SearchPanel = ({term, handleTermChange, socket}) => {
    const [inputStarted, setInputStarted] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        // Підписка на події сокета при монтуванні компонента
        socket.on('inputStarted', () => {
            setInputStarted(true);
            console.log("Input started ")
        });

        socket.on('inputEnded', () => {
            setInputStarted(false);
        });

        // Прибирання підписок при розмонтовуванні компонента
        return () => {
            socket.off('inputStarted');
            socket.off('inputEnded');
        };
    }, []);

    const handleFocus = () => {
        console.log("Start focus")
        setInputStarted(true);
        setIsFocused(true);
        socket.emit('inputStarted');
    }

    const handleAbort = () => {
        console.log("End focus")
        setInputStarted(false);
        setIsFocused(false);
        socket.emit('inputStarted');
    }

    return (
        <>
            <input type="text"
                   className={`search-panel form-control col-7 mr-3 ${inputStarted && isFocused  ? 'red-text' : 'blue-text'}`}
                   placeholder="Введіть для пошуку"
                   value={term}
                   onFocus={handleFocus}
                   onBlur={handleAbort}
                   onChange={handleTermChange}/>
        </>
    );
};

export default SearchPanel;