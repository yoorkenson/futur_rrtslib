import React from 'react';
import { BookStructure, volumeInfo } from '../store/types/book';
import noimg from '../img/noimg.png';
import { NavLink } from 'react-router-dom';


const BookItem: React.FC<BookStructure> = ({id, volumeInfo}: BookStructure) => {
    const mt: string = '—';
    const {title = mt, categories = [mt], authors = [mt], imageLinks = {}}: volumeInfo = volumeInfo;

    
    return (
        <div className='book__item' >
            <img className='book__img' src={imageLinks.smallThumbnail ? imageLinks.smallThumbnail : noimg} alt="img"/>
            <div className='book__text'>
                <p className='book__card'>Название</p>
                <h2 className='book__title'>

                    <NavLink to = {`/book/${id}`}>
                        {title}
                    </NavLink>
                    
                </h2>
                <p className='book__card'>Категория</p>
                <p className='book__category'>
                    {categories[0]}
                </p>
                <p className='book__card'>Авторы</p>
                <ul className='book__authors'>
                    {authors.map(author => {
                        return(
                            <li className='book__author' key={author}>
                                {author}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default BookItem;