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
  
  const saveForm = () => {
    console.log("Form submitted!")
  }

  const renderCategories = () => {
    return (
      <select id="select-category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Choose a category</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
    )
  }
  
  const renderPublishers = () => {
    return (
      <select id="select-publishers" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Choose a publisher</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
    )
  }
  
  const renderAuthors = () => {
    return (
      <div>
        <label htmlFor='select-authors'>Select authors</label> 
        <select id="select-authors" multiple className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
    )
  }

  return (
    <div className='md:container md:mx-auto p-2 mb-5'>
        <div id="bookForm">
          <form id="book-form" onSubmit={saveForm}>
            <input type="text" placeholder='Title'/>
            <input type="text" placeholder='Subtitle'/>
            <input type="text" placeholder='Distribution Expense'/>
            { renderCategories() }
            { renderPublishers() }
            { renderAuthors() }
            <button className="bg-blue-700 text-white rounded-lg p-2">Save</button>
          </form>
        </div>
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
