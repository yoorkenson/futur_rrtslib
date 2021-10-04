import { BookState, BookAction, BookActionTypes, bookObj } from "../types/book"


const initialState: BookState = {
    books: null,
    loading: false,
    error: null,
    startIndex: 0,
    loadMore: false
}

const add30 = (num: number) => num+30;

export const booksReducer = (state = initialState, action: BookAction): BookState => {
    switch (action.type) {
        case BookActionTypes.FETCH_BOOKS:
            return {...state, loading: true, error: null, books: {}}
        case BookActionTypes.FETCH_BOOKS_SUCCESS:
            return {...state, loading: false, error: null, books: action.payload}
        case BookActionTypes.FETCH_BOOKS_ERROR:
            return {...state, loading: false, error: action.payload, books: {}}
        case BookActionTypes.FETCH_BOOKS_INIT:
            return {...state, loading: false, error: null, books: {}}
        case BookActionTypes.CHANGE_START_INDEX:
            return {...state, startIndex: add30(state.startIndex), loadMore: true}
        case BookActionTypes.RESET_START_INDEX:
            return {...state, startIndex: 0, loadMore: false}
        case BookActionTypes.FETCH_BOOKS_MORE:
            return {...state, loading: false, error: null}
        case BookActionTypes.FETCH_BOOKS_MORE_SUCCESS:
            const oldBooksObject : bookObj = JSON.parse(JSON.stringify(state.books))
            const newBooksObject: bookObj = action.payload
            const moreBooksArray = JSON.parse(JSON.stringify(newBooksObject.items))
            oldBooksObject.items?.push(...moreBooksArray)
            // console.log('newBooksObject.items' ,newBooksObject.items)
            // console.log('newBooksObject', newBooksObject)
            return {...state, loading: false, error: null, loadMore: false, books: oldBooksObject}
        default:
            return state;
    }
}

export const FetchBooksInit = () => ({type: BookActionTypes.FETCH_BOOKS_INIT})
export const ChangeStartIndex = () => ({type: BookActionTypes.CHANGE_START_INDEX})
export const ResetStartIndex = () => ({type: BookActionTypes.RESET_START_INDEX})