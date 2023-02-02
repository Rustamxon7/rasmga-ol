import { useRef, useState } from 'react';
import { IoSearch } from 'react-icons/io5';

import searchApi from '../../api/search';

import './Search.scss';
import SearchResult from './SearchResults';

const Search = () => {
  const inputRef = useRef();
  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = async () => {
    const response = await searchApi.search(inputRef.current.value);
    setSearchResults(response.data);
  };

  return (
    <>
      <div className='search'>
        <IoSearch className='search__icon' />
        <input
          type='text'
          placeholder='Search'
          ref={inputRef}
          onChange={(e) => {
            searchHandler();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchHandler();
            }
          }}
        />
      </div>
      <SearchResult results={searchResults} />
    </>
  );
};

export default Search;
