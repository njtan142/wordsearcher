import React, { useState, useEffect, useRef, createRef, useCallback } from 'react';
import styled from 'styled-components';

export default function Board() {

    const [tiles, setTiles] = useState();
    const [mergedTiles, setMergedTiles] = useState();
    const [position, setPosition] = useState([5, 1]);
    const tileRefs = useRef([])


    const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split("");

    const refs = useRef([]);
    const keyPress = useCallback(
        (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    updatePosition('up')
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    updatePosition('down')
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    updatePosition('left')
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    updatePosition('right')
                    break;
                default:
                    return;
            }
        }, [updatePosition]
    );

    useEffect(() => {
        document.addEventListener("keydown", keyPress);
        return () => document.removeEventListener("keydown", keyPress);
    }, [keyPress]);



    useEffect(() => {
        if (tiles) {
            highlight();
        }
    }, [position, tiles])


    function initialize() {
        let arr = []
        for (let i = 0; i < 200; i++) {
            arr.push(letters[Math.floor(Math.random() * letters.length)])
        }

        setTiles(arr);
    }

    function highlight() {
        const index = position[0] * 20 + position[1];
        refs.current.map((_, i) => {
            if (index == i) {
                refs.current[i].classList.add('highlighted');
            } else {
                refs.current[i].classList.remove('highlighted');
            }
        })
        console.log(index)
    }

    function updatePosition(direction) {
        let y = position[0]
        let x = position[1]
        if (direction == 'up') {
            y -= 1;
        } else if (direction == 'down') {
            y += 1;
        } else if (direction == 'right') {
            x += 1;
        } else if (direction == 'left') {
            x -= 1;
        }


        console.log(x,y)
        if (y >= 0 && y <= 9) {
            if (x >= 0 && x <= 19) {
                setPosition([y, x])
            }
        }
    }

    return (
        <>
            <Container>
                {tiles && tiles.map((item, index) => {
                    return (
                        <Tile
                            key={index}
                            ref={(element) => {
                                refs.current[index] = element;
                            }}
                        >
                            {item}
                        </Tile>
                    );
                })}
            </Container>
            <button onClick={() => { initialize() }}>initialize</button>
        </>
    );
}

const Container = styled.div`
    margin: 0 auto;
    border: 1px solid black;
    width: 600px;
    height: 300px;
    margin-top: 3em;
    display: flex;
    flex-wrap: wrap;
`

const Tile = styled.div`
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
