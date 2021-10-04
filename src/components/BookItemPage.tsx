import React, { FC } from 'react';
import { bookObj, volumeInfo } from '../store/types/book';
import noimg from '../img/noimg.png';
import { NavLink } from 'react-router-dom';
import * as H from "history";
import { RootState } from '../store/reducers';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { FetchBooksInit } from '../store/reducers/booksReducer';
import { searchInit } from '../store/reducers/searchReducer';
import Search from './Search';

interface MatchParams {
    id: string
}

interface RouteComponentProps<P> {
    match: match<P>;
    location: H.Location;
    history: H.History;
    staticContext?: any;
}

interface match<P> {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}

interface BookItemPageProps extends RouteComponentProps<MatchParams>{
}

const BookItemPage: FC<BookItemPageProps> = ({match}: BookItemPageProps) => {

    const {params:{id}} = match
    const {books} = useTypedSelector((state: RootState) => state.books)
    const dispatch = useDispatch();

    const newBooks: bookObj = JSON.parse(JSON.stringify(books))
    const newBookList = newBooks.items?.filter((book) => book.id === id)[0]
    const newBook: volumeInfo = JSON.parse(JSON.stringify(newBookList?.volumeInfo))
    console.log(newBook)

    return (
        <div>
            <Search/>
            <NavLink className='counter' to='/' onClick={() => {
                dispatch(searchInit())
                dispatch(FetchBooksInit())
            }}>На главную</NavLink>

            <div className='book__page' >
                <div className="container">
                    <div className="book__page__wrapper">
                        <img className='book__img_page' src={newBook.imageLinks.thumbnail ? newBook.imageLinks.thumbnail : noimg} alt="img"/>
                        <div className='book__text_page'>
                            <p className='book__card'>Название</p>
                            <h2 className='book__title'>
                                    {newBook.title ? newBook.title : '—'}
                            </h2>
                            <p className='book__card'>Категория</p>
                            <ul className='book__category'>
                                {(newBook.categories?.length !== 0) ? newBook.categories?.map(category => {
                                    return(
                                        <li className='book__author' key={category}>
                                            {category}
                                        </li>
                                    )
                                }) : '—'}
                            </ul>
                            <p className='book__card'>Авторы</p>
                            <ul className='book__authors'>
                                {(newBook.authors) ? newBook.authors?.map(author => {
                                    return(
                                        <li className='book__author' key={author}>
                                            {author}
                                        </li>
                                    )
                                }) : 
                                        <li  className='book__author'>—</li>}
                            </ul>
                            <p className='book__card'>Описание</p>
                            <p className='book__descr'>
                                {newBook.description ? newBook.description : '—'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookItemPage;