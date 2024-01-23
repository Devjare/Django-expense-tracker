import { ReactNode, useEffect, useRef, useState } from 'react';

import { Book, BookFormProps, Entity } from "../types"
import BookRow from "../components/BookRow";
import TruncatedPagination from '../components/TruncatedPagination';

const BookForm = ({ 
  categoryList = [], 
  authorList = [], 
  publisherList = [],
  selectedTitle = "",
  selectedSubtitle = "",
  selectedPublishedDate = "",
  selectedDE = 0,
  selectedCategory = "",
  selectedPublisher = "", 
  selectedAuthors = [],
  onSaveBook} : BookFormProps) => {

  const saveForm = () => {
    console.log()
  }
  
  return (
    <div id="bookForm" className='border border-gray-300 rounded p-2 flex'>
      <div className='max-w-xlg mx-auto' id="book-form">
        <div className='grid grid-cols-5 gap-2 m-2'>
          <input className='col-span-2 p-2 border-2 rounded-lg'
            type="text" placeholder='Title' defaultValue={selectedTitle}/>
          <input className='col-span-2 mr-2 p-2 border-2 rounded-lg'
            type="text" placeholder='Subtitle' defaultValue={selectedSubtitle}/>
          <input 
            type="number" 
            step="0.1"
            className='mr-2 p-2 border-2 rounded-lg' 
            placeholder='Distribution Expense' 
            defaultValue={selectedDE} 
            required   
          />

        </div>
        <div className='grid grid-cols-5 gap-2 m-2'>
          <div className='grid grid-cols-4 gap-2 col-span-2'>
            <select id="select-category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 col-span-3"
              defaultValue={selectedCategory}>
              {categoryList.map(el => <option key={el.id} defaultValue={el.name}>{el.name}</option>)}
            </select>
            <button className='rounded-lg bg-blue-700 text-white'>New</button>
          </div>
          <div className='grid grid-cols-4 gap-2 col-span-2'>
            <select 
              id="select-publisher"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 col-span-3"
              defaultValue={selectedPublisher}>
              { publisherList.map(el => <option key={el.id} defaultValue={el.name}> {el.name}</option>) }
            </select>
            <button className='rounded-lg bg-blue-700 text-white'>New</button>
          </div>
          <div className='col-span-1'>
            <input 
              id="published-date" 
              className='mr-2 p-2 border-2 rounded-lg' 
              type='date' 
              defaultValue={selectedPublishedDate} />
          </div>
        </div>
        <select id="select-authors" className="bg-gray-50 border border-gray-300
          text-gray-900 text-sm rounded-lg focus:ring-blue-500
          focus:border-blue-500 block w-full p-2.5"
          multiple={true} defaultValue={selectedAuthors}>
          { authorList.map((element) => 
            <option key={element.id} defaultValue={element.name}>{element.name}</option> )
          } 
        </select>
        <button className="bg-blue-700 text-white rounded-lg p-2 mt-4"
          onClick={() => saveForm()}>Save</button>
      </div>
    </div>
  )
}

export default function BooksPage() {

  const books = useRef([])
  // const [ editBook, setEditBook ]  = useState(null)

  const [ pageBooks, setPageBooks ]= useState([])
  const [ currentPage, setCurrentPage ] = useState(1)

  let start = 1
  const [ booksPerPage, setBooksPerPage ] = useState(20);
  
  const categoryList = useRef<Entity[]>([]);
  const publisherList = useRef<Entity[]>([]);
  const authorList = useRef<Entity[]>([]);
        
  const [ selectedTitle, setSelectedTitle ] = useState("");
  const [ selectedSubtitle, setSelectedSubtitle ] = useState("");
  const [ selectedPublishedDate, setSelectedPublishedDate ] = useState("");
  const [ selectedDE, setSelectedDE ] = useState("");
  const [ selectedCategory, setSelectedCategory ] = useState("");
  const [ selectedPublisher, setSelectedPublisher ] = useState("");
  const [ selectedAuthors, setSelectedAuthors ] = useState<string[]>([]);

  useEffect(() => {
    if(books.current.length > 0) {
      setPageBooks(books.current.slice((start - 1)+ (booksPerPage *
        currentPage), booksPerPage + (booksPerPage * currentPage)))
    } else {
      fetch("http://localhost:8000/books")
        .then((response) => response.json())
        .then(data => { 
          books.current = data 
          setPageBooks(books.current.slice((start - 1) + (booksPerPage *
            currentPage), booksPerPage + (booksPerPage * currentPage)))
        })
      fetch("http://localhost:8000/authors")
        .then((response) => response.json())
        .then((data) => {
          authorList.current = data
        })
      fetch("http://localhost:8000/publishers")
        .then((response) => response.json())
        .then((data) => {
          publisherList.current = data
        })
      fetch("http://localhost:8000/categories")
        .then((response) => response.json())
        .then((data) => {
          categoryList.current = data
        })
    }
  }, [currentPage])

  const setEditForm = (book: Book) => {
    console.info(book);
    setSelectedTitle(book.title)
    setSelectedSubtitle(book.subtitle)
    setSelectedDE(book.distribution_expense.toString())
    setSelectedCategory(book.category);
    setSelectedPublisher(book.publisher);
    setSelectedAuthors(book.authors);
    setSelectedPublishedDate(book.published_date);
}
  
  const onSaveBook = (book: Book) => {
    console.log("Editing book", book)
  }
  return (
    <div className='h-screen md:container md:mx-auto p-2 mb-5'>
      <BookForm
        categoryList={categoryList.current}
        publisherList={publisherList.current}
        authorList={authorList.current}
        selectedTitle={selectedTitle}
        selectedSubtitle={selectedSubtitle}
        selectedPublishedDate={selectedPublishedDate}
        selectedDE={selectedDE}
        selectedCategory={selectedCategory}
        selectedPublisher={selectedPublisher}
        selectedAuthors={selectedAuthors}
        onSaveBook={onSaveBook}
      />
      <div id="booksList" className='relative overflow-x-auto shadow-md md:rounded-lg my-6'>
        <div className='flex justify-start items-center'>
          <label htmlFor='input-booksPerPage' className='font-bold mr-2 uppercase'>Books number: </label>
          <input 
            className='border-2 px-2 py-1 rounded-lg'
            id='input-booksPerPage' type="number" defaultValue={10} onChange={() => {setBooksPerPage(10)}}/>
        </div>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-100 uppercase dark:bg-gray-800'>
            <tr> 
              <th scope="col" className="p-4">
                <div className='flex items-center'>
                  <input 
                    id="checkbox-all-search" 
                    type="checkbox"
                    className='w-4 h-4 text-blue-600 bg-gray-100
                    border-gray-300 rounded focus:ring-blue-500 focus:ring-2
                    dark:bg-gray-700' />
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
            { pageBooks.map((book : Book) => <BookRow key={book.id} book={book} setEditForm={() => setEditForm(book)} />) }
          </tbody>
        </table> 
      </div>
      <div className='mb-16'>
        <TruncatedPagination 
          totalCount={books.current.length}
          siblingCount={3}
          currentPage={currentPage}
          pageSize={booksPerPage}
          onPageChange={(currentPage : number) => setCurrentPage(currentPage)} />
      </div>
    </div>
  );
}
