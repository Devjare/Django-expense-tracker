import { useMemo } from "react"

export const DOTS: string = "...";

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
} : { 
    totalCount: number, 
    pageSize: number, 
    siblingCount: number, 
    currentPage:number }) : [] => {
  
  const paginationRange = useMemo(() => {
    const range = (start : number, end : number) : Array<number> => {
      let length = end - start + 1;
       
      return Array.from({ length }, (_, idx) => idx + start)
    }

    // pagination logic 
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;
  
    // Not enough pages to even show Dowts.
    if (totalPageNumbers >= totalPageCount)
      return range(1, totalPageCount)
    
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount
    
    // Only show right dots
    if(!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    // Only show left dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
      return [ firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [ firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
}


// export function usePagination(totalCount : number, pageSize : number, currentPage : number, siblingCount : number = 1) {
//   console.log(totalCount) 
//   console.log(pageSize) 
//   console.log(currentPage) 
//   console.log(siblingCount) 
// }
// 
// usePagination(1,2,3,4)
//
