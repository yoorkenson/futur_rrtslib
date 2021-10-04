export interface BookState {
    books: bookObj | null;
    loading: boolean;
    error: null | string;
    startIndex: number;
    loadMore: boolean;
}

export interface bookObj {
    totalItems?: number;
    items?: Array<BookStructure>
}

export interface BookProps {
    link: string;
    volumeInfo: volumeInfo
}

export interface BookStructure {
    id?: string;
    etag?: string;
    idkey?: string;
    volumeInfo: volumeInfo
}

export interface volumeInfo {
    title: string;
    categories?: Array<string>;
    authors: Array<string>;
    description: string;
    imageLinks: imageSizes;
}

export interface imageSizes {
    smallThumbnail?: string;
    thumbnail?: string;
}

export enum BookActionTypes {
    FETCH_BOOKS = 'FETCH_BOOKS',
    FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS',
    FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR',
    FETCH_BOOKS_INIT = 'FETCH_BOOKS_INIT',
    FETCH_BOOKS_MORE = 'FETCH_BOOKS_MORE',
    CHANGE_START_INDEX = 'CHANGE_START_INDEX',
    RESET_START_INDEX =  'RESET_START_INDEX',
    FETCH_BOOKS_MORE_SUCCESS = 'FETCH_BOOKS_MORE_SUCCESS'
}

interface FetchBooks {
    type: BookActionTypes.FETCH_BOOKS;
}

interface FetchBooksSuccess {
    type: BookActionTypes.FETCH_BOOKS_SUCCESS;
    payload: object;
}

interface FetchBooksError {
    type: BookActionTypes.FETCH_BOOKS_ERROR;
    payload: string;
}

interface FetchBooksInit {
    type: BookActionTypes.FETCH_BOOKS_INIT;
}

interface FetchBooksMore {
    type: BookActionTypes.FETCH_BOOKS_MORE;
}

interface FetchBooksMoreSuccess {
    type: BookActionTypes.FETCH_BOOKS_MORE_SUCCESS;
    payload: object;
}

interface ChangeStartIndex {
    type: BookActionTypes.CHANGE_START_INDEX;
}

interface resetStartIndex {
    type: BookActionTypes.RESET_START_INDEX;
}

export type BookAction = FetchBooks | FetchBooksSuccess | FetchBooksError | FetchBooksInit | ChangeStartIndex | resetStartIndex | FetchBooksMore | FetchBooksMoreSuccess
