function findAccountById(accounts, id) {
  let accountMatch = accounts.find((account) => account.id === id);
  return accountMatch;
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  const { id: acctId } = account;
  return books.reduce((acc, book) => {
    return (
      acc + book.borrows.filter(borrow => borrow.id === acctId)
      .reduce((accountBorrows, borrow) => accountBorrows + 1, 0));
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  let checkedOut = [];
  books.forEach((book) => {
    if (book.borrows.find((item)=> item.id === account.id && !item.returned)) {
      checkedOut.push(book);
    }
  })
  checkedOut.forEach(book => {
    let authorName = authors.find(person => person.id === book.authorId);
    book['author'] = authorName;
  })
  return checkedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
