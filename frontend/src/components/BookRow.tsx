import { Book } from "../models"

interface IBookRowProps {
  book: Book;
}

export default function BookRow({ book } : IBookRowProps) : JSX.Element{

  return (
    <tr className='bg-white border-b hover:bg-gray-50'>
      <td className='w-4 p-4'>
        <div className="flex items-center">
          <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
          <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
        </div>
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-wrap">{book.title}</th>
      <td className="px-6 py-4">{book.subtitle}</td>
      <td className="px-6 py-4">{book.published_date}</td>
      <td className="px-6 py-4">{book.authors}</td>
      <td className="px-6 py-4">{book.categories}</td>
      <td className="px-6 py-4">{book.publisher}</td>
      <td className="px-6 py-4">{book.distribution_expense}</td>
      <td className="flex items-center px-6 py-4">
        <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
        <a href="#" className="font-medium text-red-600 hover:underline ms-3">Remove</a>
      </td>
    </tr>
  );
}
