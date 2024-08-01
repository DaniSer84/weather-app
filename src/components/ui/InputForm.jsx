

import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";

const StyledInputForm = styled.div`
    text-align: center;
    margin: ${props => props.theme.s2};
`
const StyledInput = styled.input`
    padding: .36rem;
`

export default function InputForm({
    inputAction,
    placeholder, 
    inputValue,
    buttonAction, 
    buttonText, 
}) {

    // come prop ho passato qualcosa che può sovrascrivere questo stato interno, perché a volte potrei avere bisogno di utilizzare lo stato esterno al componente, di conseguenza se non c'è un input handler esterno utilizzo lo stato del componente, altrimenti vado a prendere lo stato che viene passato al componente, in questo caso da cityList 
    const [localInputValue, setLocalInputValue] = useState('')

    function handleInputChange(e) {
        if (inputAction) {
            inputAction(e.target.value)
        } else {
            setLocalInputValue(e.target.value)
        }
    }

    function handleButtonClick() {
        buttonAction((inputAction) ? inputValue : localInputValue)
        setLocalInputValue('')
    }

    function handleOnKeyDown(e) {
        if (e.key === 'Enter') {
            handleButtonClick()
        } 
    }
    
    return (
        <>
        <StyledInputForm>
            <StyledInput 
                type="text" 
                placeholder={placeholder}
                onChange={handleInputChange}
                value={(inputAction) ? inputValue : localInputValue}
                onKeyDown={handleOnKeyDown}
            />
            <Button 
                handleClick={handleButtonClick} 
                children={buttonText}
            />
        </StyledInputForm>
        </>
    )
}

// sto tenendo stateless anche questo componente. applicando le props. 