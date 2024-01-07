import { ReactNode, useEffect, useRef, useState } from 'react';

import { Book } from "../models"
import BookRow from "../components/BookRow";

export default function BooksPage() {
  
  const books = useRef([])
  const pages = useRef(100)
  
  const [ pageBooks, setPageBooks ]= useState([])
  const [ page, setPage ] = useState(0)
    
  let start = 0
  let booksPerPage = 10
  useEffect(() => {
    console.log("Books: ")
    console.log(books)
    if(books.current.length > 0) {
      setPageBooks(books.current.slice(start + (booksPerPage * page), booksPerPage + (booksPerPage * page)))
      console.log("New books shown: ")
      console.log(pageBooks)
    } else {
      fetch("http://localhost:8000/books")
        .then((response) => response.json())
        .then(data => { 
          books.current = data 
          pages.current = Math.floor(books.current.length / booksPerPage )
          setPageBooks(books.current.slice(start + (booksPerPage * page), booksPerPage + (booksPerPage * page)))
        })
    }
  }, [page])
  
  function createList() {

    let elements = []

    for (let i = 0; i < pages.current;i++) {
      elements.push(
        <li key={i}>
          <button className="flex items-center justify-center px-3 h-8
            leading-tight text-gray-500 bg-white border border-gray-300
            hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800
            dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
            dark:hover:text-white" onClick={() => {
            console.log(`Button ${i} clicked.`)
            setPage(i)
            } }>{i}</button>
        </li>)
    }
      
    return (  
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            { elements.map((el : ReactNode) => el ) }
          </ul>
    );
  }
    
  return (
    <div className='md:container md:mx-auto p-2 mb-5'>
        <div id="booksList" className='relative overflow-x-auto shadow-md md:rounded-lg'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className='text-xs text-gray-100 uppercase dark:bg-gray-800'>
              <tr>
                <th scope="col" className="p-4">
                  <div className='flex items-center'>
                    <input id="checkbox-all-search" type="checkbox" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700' />
                  <label htmlFor="checkbox-all-search" className='sr-only'>Select all</label>
                  </div>
                </th>
                <th scope="col" className='px-6 py-3'>Title</th>
                <th scope="col" className='px-6 py-3'>Subtitle</th>
                <th scope="col" className='px-6 py-3'>Published date</th>
                <th scope="col" className='px-6 py-3'>Authors</th>
                <th scope="col" className='px-6 py-3'>Categories</th>
                <th scope="col" className='px-6 py-3'>Publisher</th>
                <th scope="col" className='px-6 py-3'>Distribution Expense</th>
                <th scope="col" className='px-6 py-3'>Actions</th>
              </tr>
            </thead>
            <tbody>
              { pageBooks.map((book : Book) => <BookRow key={book.id} book={book} />) }
            </tbody>
          </table> 
        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400
            mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span
              className="font-semibold text-gray-900
              dark:text-white">1-10</span> of <span className="font-semibold
              text-gray-900 dark:text-white">1000</span></span>
          { createList() }
        </nav>
      </div>
    </div>
  );
}
