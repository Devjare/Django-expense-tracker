import { useEffect, useState } from 'react';

import { Book } from "../models"
import BookRow from "../components/BookRow";

export default function BooksPage() {
  
  const [ books, setBooks ] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/books")
    .then((response) => response.json())
    .then(data => setBooks(data))
  }, [])
  

  return (
    <div className='md:container md:mx-auto p-2'>
        <div id="booksList" className='relative overflow-x-auto shadow-md md:rounded-lg'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
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
                <th scope="col" className='px-6 py-3'>Actions</th>
              </tr>
            </thead>
            <tbody>
              { books.map((book : Book) => <BookRow key={book.id} book={book} />) }
            </tbody>
          </table>
        </div>
    </div>
  );
}
