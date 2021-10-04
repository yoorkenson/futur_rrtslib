import { Dispatch } from "react"
import { BookAction, BookActionTypes } from "../types/book"


export const fetchBooks = (query: string, sorting: string, category: string, startIndex: number = 0, loadMore: boolean = false) => {
    
    if (query !== '') {
        const queryEdited: string = query.split(' ').join('+').toLowerCase()
        return (dispatch: Dispatch<BookAction>) => {
            loadMore ? dispatch({type: BookActionTypes.FETCH_BOOKS_MORE}) : dispatch({type: BookActionTypes.FETCH_BOOKS})

            fetch(`https://www.googleapis.com/books/v1/volumes?q=${category}${queryEdited}&maxResults=30&startIndex=${startIndex}&orderBy=${sorting}&key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(result => loadMore ? dispatch({type: BookActionTypes.FETCH_BOOKS_MORE_SUCCESS, payload: result}) :dispatch({type: BookActionTypes.FETCH_BOOKS_SUCCESS, payload: result}))
            .catch(() => 
                dispatch({type: BookActionTypes.FETCH_BOOKS_ERROR, 
                            payload: 'Произошла ошибка при закгрузке книг'}))
        }
    } 

    else return (dispatch: Dispatch<BookAction>) => {
        dispatch({type: BookActionTypes.FETCH_BOOKS_INIT})
    }

}