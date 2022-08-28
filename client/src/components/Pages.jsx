import React from 'react';

export default function Pages ({ cardsPerPage, dogs, clickHandler }) {
    const pages = [];

    for (let i = 1; i <= Math.ceil(dogs / cardsPerPage); i++) {
        pages.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pages.map(n => (
                    <li key={n}>
                        <a href="#" onClick={() => clickHandler(n)}>
                            {n}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
