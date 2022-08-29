import React from 'react';
import style from '../styles/Pages.css';

export default function Pages ({ cardsPerPage, dogs, clickHandler, currentPage }) {
    const pages = [];

    for (let i = 1; i <= Math.ceil(dogs / cardsPerPage); i++) {
        pages.push(i);
    }

    return (
            <div id='pagination' style={style}>
                {pages.map(n => (
                        <a key={n} href="#" className='page'  id={currentPage === n && 'active'} onClick={() => clickHandler(n)}>
                            {n}
                        </a>
                ))}
            </div>
    );
};
