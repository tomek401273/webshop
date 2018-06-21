export class PagerService {

  getPager(totalItems: number, currentPage: number, pageSize: number = 5) {
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage = 0;
    let endPage = 0;

    if (totalPages <= pageSize) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return {
      currentPage: currentPage,
      totalPages: totalPages,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
