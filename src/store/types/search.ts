export interface SearchState {
    query: string;
    category: string;
    sorting: string;

}

export enum SearchActionTypes {
    CHANGE_QUERY = 'QUERY_CHANGE',
    CHANGE_CATEGORY = 'CHANGE_CATEGORY',
    CHANGE_SORTING = 'CHANGE_SORTING',
    SEARCH_INIT = 'SEARCH_INIT'
}

interface ChangeQuery {
    type: SearchActionTypes.CHANGE_QUERY;
    payload: string;
}

interface ChangeCategory {
    type: SearchActionTypes.CHANGE_CATEGORY;
    payload: string;
}

interface ChangeSorting {
    type: SearchActionTypes.CHANGE_SORTING;
    payload: string;
}

interface SearchInit {
    type: SearchActionTypes.SEARCH_INIT
}


export type SearchAction = ChangeQuery | ChangeCategory | ChangeSorting | SearchInit