import React from 'react';
import style from '../styles/Pages.css';

export default function Pages({ cardsPerPage, dogs, clickHandler, currentPage, clickPrevHandler, clickNextHandler }) {
    
    const pages = [];

    for (let i = 1; i <= Math.ceil(dogs / cardsPerPage); i++) {
        pages.push(i);
    }
    
    return (
        <div id='pagination' style={style}>
            <a key='prev' href="#" className='page' id={currentPage < 1 ? 'disabled' : undefined} 
            onClick={() => {currentPage > 1 ? clickPrevHandler() : console.log()}}>Prev</a>

            {pages.map(n => (
                <a key={n} href="#" className='page' id={currentPage === n ? 'active' : undefined} onClick={() => clickHandler(n)}>
                    {n}
                </a>
            ))}

            <a key='next' href="#" className='page' id={currentPage > pages.length ? 'disabled' : undefined} 
            onClick={() => {currentPage < pages.length ? clickNextHandler() : console.log()}}>Next</a>
        </div>
    );
};
