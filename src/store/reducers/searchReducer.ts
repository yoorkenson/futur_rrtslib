import { SearchAction, SearchActionTypes, SearchState } from "../types/search"

const initialState: SearchState = {
    query: '',
    category: '',
    sorting: 'relevance'
}

export const searchReducer = (state = initialState, action: SearchAction ) => {
    switch (action.type) {
        case SearchActionTypes.CHANGE_QUERY:
            let search: string = (action.payload)
            return {...state, query: search}
        case SearchActionTypes.CHANGE_CATEGORY:
            return {...state, category: action.payload}
        case SearchActionTypes.CHANGE_SORTING:
            return {...state, sorting: action.payload}
        case SearchActionTypes.SEARCH_INIT:
            return {query: '', category: '', sorting: 'relevance'}
        default:
            return state
    }
}

export const searchInit = () => ({type: SearchActionTypes.SEARCH_INIT})
export const changeQueryAction = (payload: string) => ({type: SearchActionTypes.CHANGE_QUERY, payload})
export const changeCategoryAction = (payload: string) => ({type: SearchActionTypes.CHANGE_CATEGORY, payload})
export const changeSortingAction = (payload: string) => ({type: SearchActionTypes.CHANGE_SORTING, payload})