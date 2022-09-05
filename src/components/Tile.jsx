import React from 'react';
import styled from 'styled-components';

export default function Tile(props) {
    return (
        <Container className='tile'>
            <div>
                {props.children}
            </div>
        </Container>
    )
}


const Container = styled.div`
    width: 30px;
    height: 30px;
    font-size: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    border: 1px solid #e4e4e4;
`;