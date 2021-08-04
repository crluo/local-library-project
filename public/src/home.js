function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    let borrowed = book.borrows[0].returned;
    if (borrowed === false) {
      acc++;
    }
    return acc;
  }, 0);
}

function getMostCommonGenres(books) {
  let countGenres = books.reduce((acc, {genre}) => {
    if(acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});
  let sortedGenres = _sortObjectByValues(countGenres);
  let sorted = sortedGenres.map((key) => ({name: key, count: countGenres[key]})).slice(0,5);
  return sorted;
}

function getMostPopularBooks(books) {
  let bookList = books.reduce((acc, {title, borrows}) => {
    acc[title] = borrows.length;
    return acc;
  }, [])
  let sortedBookList = _sortObjectByValues(bookList);
  let sorted = sortedBookList.map((key) => ({name: key, count: bookList[key]})).slice(0,5);
  return sorted;
}

function getMostPopularAuthors(books, authors) {
  let countAuthors = books.reduce((acc, books) => {
    let {authorId, borrows} = books;
    let authorObject = authors.find((author) => author.id === authorId);
    let name = `${authorObject.name.first} ${authorObject.name.last}`;
    if(acc[name]) {
      acc[name] += borrows.length;
    } else {
      acc[name] = borrows.length;
    }
    return acc;
  }, {});
  let sortedAuthors = _sortObjectByValues(countAuthors);
  let sorted = sortedAuthors.map((key) => ({name: key, count: countAuthors[key]})).slice(0,5);
  return sorted;
}

function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if(obj[keyA] > obj[keyB]) {
      return -1;
    } else if(obj[keyB] > obj[keyA]) {
      return 1;
    }
    return 0;
  });
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
