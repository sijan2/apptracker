import React from 'react'

function Search() {
  return (
    <div className='relative  focus-within:z-10 mt-4'>
      <input
        className='block h-11 w-full rounded-md bg-gray-100 border-gray-500 pl-10 text-base leading-5 transition focus:border-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-300'
        data-testid='custom-search'
        placeholder='Search for roles or companies'
        type='search'
      ></input>
    </div>
  )
}

export default Search
