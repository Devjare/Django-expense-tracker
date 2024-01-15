import { useEffect } from "react";
import { DOTS, usePagination } from "../usePagination";

export type PaginationProps = {
  totalCount : number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange : Function;
}

export default function TruncatedPagination({ totalCount, siblingCount, currentPage, pageSize, onPageChange } : PaginationProps) {  

  useEffect(() => {
    console.log("Rendering pagination...")

    return () => {
      console.log("Pagination rendered.")
    }
  }, [])
  
  const paginationRange = usePagination({ totalCount, pageSize, siblingCount, currentPage })
   
  if (currentPage === 0 || paginationRange?.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }
  
  return (
    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
      <button onClick={onPrevious} className="flex items-center justify-center px-3 h-8
        leading-tight text-gray-500 bg-white border border-gray-300
        hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800
        dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
        dark:hover:text-white">{"<-"}</button>
      {
        paginationRange.map(pageNumber => {
          if (pageNumber === DOTS) {
            return <li className="flex items-center justify-center px-3 h-8
              leading-tight text-gray-500 bg-white border border-gray-300
              hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800
              dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
              dark:hover:text-white">{"..."}</li>
          }
          return (<li onClick={() => onPageChange(pageNumber)}>
            <button className="flex items-center justify-center px-3 h-8
              leading-tight text-gray-500 bg-white border border-gray-300
              hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800
              dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
              dark:hover:text-white">{pageNumber}</button>
          </li>)
        })
      }
      <button onClick={onNext} className="flex items-center justify-center px-3 h-8
        leading-tight text-gray-500 bg-white border border-gray-300
        hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800
        dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
        dark:hover:text-white">{"->"}</button>
    </ul>
  );
}
