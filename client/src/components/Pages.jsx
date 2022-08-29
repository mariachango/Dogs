import React from 'react';
import style from '../styles/Pages.css';

export default function Pages({ cardsPerPage, dogs, clickHandler, currentPage, clickPrevHandler, clickNextHandler }) {

    const pages = [];

    for (let i = 1; i <= Math.ceil(dogs / cardsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div id='pagination' style={style}>
            <li className='shown'>
                <a key='prev' href="#" className='pn'
                    onClick={() => { currentPage > 1 ? clickPrevHandler() : console.log() }}>Prev</a>
            </li>

            {pages.map(n => (
                <li key={n} className={n < (currentPage - 1) || n > (currentPage + 1) ? 'hidden' : 'shown'} >
                    <a  href="#" className='page' id={currentPage === n ? 'active' : undefined} onClick={() => clickHandler(n)}>
                        {n}
                    </a>
                </li>
            ))}

            <li className='shown'>
                <a key='next' href="#" className='pn'
                    onClick={() => { currentPage < pages.length ? clickNextHandler() : console.log() }}>Next</a>
            </li>
        </div>
    );
};
