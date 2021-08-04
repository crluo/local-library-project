function findAuthorById(authors, id) {
  return findAu = authors.find((theAuthors) => theAuthors.id === id);
}

function findBookById(books, id) {
  return findBo = books.find((theBooks) => theBooks.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  return books.reduce( (bookA, bookB) => { bookA[+(bookB.borrows[0] && bookB.borrows[0].returned)]
    .push(bookB); return bookA }, [[],[]] )
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  let {borrows} = book;
  borrows.forEach(borrow=> {
    let account = accounts.find(acc => acc.id === borrow.id);
    account['returned'] = borrow.returned;
    result.push(account);
  })
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
