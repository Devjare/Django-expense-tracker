import { ReactNode, useEffect, useRef, useState } from 'react';

import { Book } from "../models"
import BookRow from "../components/BookRow";
import TruncatedPagination from '../components/TruncatedPagination';

export default function BooksPage() {
  
  const books = useRef([])
  
  const [ pageBooks, setPageBooks ]= useState([])
  const [ currentPage, setCurrentPage ] = useState(1)
    
  let start = 1
  let booksPerPage = 10

  useEffect(() => {
    if(books.current.length > 0) {
      setPageBooks(books.current.slice((start - 1)+ (booksPerPage * currentPage), booksPerPage + (booksPerPage * currentPage)))
    } else {
      fetch("http://localhost:8000/books")
        .then((response) => response.json())
        .then(data => { 
          books.current = data 
          setPageBooks(books.current.slice((start - 1) + (booksPerPage * currentPage), booksPerPage + (booksPerPage * currentPage)))
        })
    }
  }, [currentPage])
   
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
      </div>
      <TruncatedPagination 
        totalCount={books.current.length}
        siblingCount={3}
        currentPage={currentPage}
        pageSize={booksPerPage}
        onPageChange={(currentPage : number) => setCurrentPage(currentPage)} />
    </div>
  );
}
