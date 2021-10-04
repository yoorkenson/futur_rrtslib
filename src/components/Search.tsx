import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import img from '../img/search.png';
import { fetchBooks } from '../store/action-creator/search';
import { RootState } from '../store/reducers';
import { ResetStartIndex } from '../store/reducers/booksReducer';
import { changeCategoryAction, changeQueryAction, changeSortingAction } from '../store/reducers/searchReducer';



const Search: React.FC = () => {
    const {query, category, sorting} = useTypedSelector((state: RootState) => state.search)
	const dispatch = useDispatch()

	const submitSearch = () => {
		dispatch(ResetStartIndex())
		dispatch(fetchBooks(query, sorting, category))
	}

	// fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=30&orderBy=relevance&q=bible:keyes&key=${process.env.REACT_APP_API_KEY}`)
	// .then(res => res.json())
	// .then(result => console.log(result))

	return (
		<div className="search">
			<div className="container container_search">
				<h1 className="search__title">Google Books</h1>
				<div className='search__form' >
					<div className="search__input">
						<input type='text' placeholder='write something' value={query} onChange={(e) => dispatch(changeQueryAction(e.target.value))}/>
						<button onClick={submitSearch}>
						<NavLink to='/'>
							<img src={img} alt="search"/>
						</NavLink>
						</button>
					</div>
					<div className="search__params">
						<div className="search__catsort">
							<p className='search__descr'>Categories</p>
							<select value={category} name="categories" id="categories" onChange={(e) => dispatch(changeCategoryAction(e.target.value))}>
								<option value="">All</option>
								<option value="subject:Art+">Art</option>
								<option value="subject:Biography+">Biography</option>
								<option value="subject:Computers+">Computers</option>
								<option value="subject:History+">History</option>
								<option value="subject:Medical+">Medical</option>
								<option value="subject:Poetry+">Poetry</option>
							</select>
						</div>
						<div className="search__catsort">
							<p className='search__descr'>Sorting by</p>
							<select value={sorting} name="sorting" id="sorting" onChange={(e) => dispatch(changeSortingAction(e.target.value))}>
								<option value="relevance">relevance</option>
								<option value="newest">newest</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Search;