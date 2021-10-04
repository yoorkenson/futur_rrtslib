import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { fetchBooks } from '../store/action-creator/search';
import { RootState } from '../store/reducers';
import { ChangeStartIndex } from '../store/reducers/booksReducer';
import { BookStructure, bookObj } from '../store/types/book';
import BookItem from './BookItem';


const BooksList: React.FC = () => {

    const {books, loading, error, startIndex, loadMore} = useTypedSelector((state: RootState) => state.books)

    const {query, category, sorting} = useTypedSelector((state: RootState) => state.search)

    function isEmpty(obj: bookObj | null) {
        for (let key in obj) {
            return false;
        }
        return true;
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchBooks(query, sorting, category, startIndex, loadMore))
    }, [startIndex])

    if (loading) {
        return <h1 className='counter'>Loading...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    if (!isEmpty(books)) {
        console.log(books)
        const items: Array<BookStructure> | undefined = books?.items
        if (books?.items) {
            return (
                <div className='books'>
                    <h1 className="counter">
                        Found {books.totalItems} books.
                    </h1>
                    <div className="container">
                        <div className='books__wrapper'>
                            {items!.map(item => {
                                const {id, etag, volumeInfo} = item
                                return (
                                    <BookItem
                                        id={id}
                                        key = {id!+etag}
                                        volumeInfo = {volumeInfo}
                                    />
                                )
                            })}
                        </div>
                        <div className="button__wrapper">
                            <button className={(true) ? 'button' : 'button_hide'}
                                    onClick={() => (dispatch(ChangeStartIndex()))}
                                    >
                                {loadMore ? 'Loading...' : 'Load more'}
                            </button>
                        </div>

                    </div>
                </div>
            )
        } else {
            return (
                <div className='books'>
                    <h1 className="counter">
                        There are no books found
                    </h1>
                </div>
            )
        }
    }

    return <h1 className='counter'>Введите название книги для поиска</h1>
}

export default BooksList;