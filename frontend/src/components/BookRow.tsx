import { Book, IBookRowProps } from "../types"

export default function BookRow({ book, setEditForm } : IBookRowProps) : JSX.Element {
  return (
    <tr id={`row-book-${book.id}`} className='bg-white border-b hover:bg-gray-50'>
      <td className='w-4 p-4'>
        <div className="flex items-center">
          <input 
            id="checkbox-table-search-1" 
            type="checkbox" 
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded
            focus:ring-blue-500 focus:ring-2"/>
          <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
        </div>
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 truncate">
        <a 
          className="font-medium text-blue-600 hover:underline"
          href="#" 
          onClick={() => setEditForm(book.id)}>{book.title}</a>
      </th>
      <td className="px-6 py-4 truncate">{book.subtitle}</td>
      <td className="px-6 py-4 truncate">{book.published_date}</td>
      <td className="px-6 py-4 truncate">{book.authors.join()}</td>
      <td className="px-6 py-4 truncate">{book.category}</td>
      <td className="px-6 py-4 truncate">{book.publisher}</td>
      <td className="px-6 py-4 truncate">{book.distribution_expense}</td>
    </tr>
  );
}
