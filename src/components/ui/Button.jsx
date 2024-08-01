import styled from 'styled-components'

const StyledButton = styled.button`
    align-items: center;
    background-color: ${props => props.theme.lightPrimary};
    color: black;
    border: none;
    cursor: pointer;
    font-size: ${props => props.theme.s1};
    padding: 0.5rem .8rem;
    &:hover {
        color: white;
        background-color: ${props => props.theme.primary};
    }
`

export default function Button({children, handleClick}) {
    return (
        <>
        <StyledButton onClick={handleClick}>{children}</StyledButton>
        </>
    )
}

// dumb component, senza logica interna, per essere usato ovunque